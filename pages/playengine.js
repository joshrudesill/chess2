import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/board";
import {
  setPosition,
  setTimerOffset,
  setGameStartTime,
  setWhite,
  setFirstMove,
  setMyTurn,
  setMoveInTime,
  resetPieceState,
  addChatMessage,
  setChatOnReconnect,
  pushNewNotation,
  pushMoveTime,
  setNotationOnReconnnect,
  setMoveTimesOnReconnect,
  setLastMove,
  pushTakenPiece,
  setTakenPiecesOnReconnect,
  setEnPassant,
  setEngine,
  pushEngineNotation,
  changePieceAtSquare,
  setActivePieceAtSquare,
  capturePiece,
  resetAll,
  castleKing,
} from "../features/board/boardSlice";
import {
  endGame,
  setGame,
  setGameStarted,
  setInGameData,
  setOpponentConnection,
  setPing,
  setSession,
} from "../features/app/appSlice";
import socket from "../socket";
import Sidebar from "../components/sidebar";
import GameInfo from "../components/gameInfo";
import useTimer from "../util/usetimer";
import useSound from "use-sound";
import useStockfish from "../util/usestockfish";
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const PlayEngine = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [inGameRoom, setInGameRoom] = useState(false);
  const whitelocal = useRef(null);

  const { gameID, sessionID, gameStarted } = useSelector((state) => ({
    gameID: state.app.sessionDetails.gameID,
    sessionID: state.app.sessionDetails.sessionID,
    gameStarted: state.app.inGameData.gameStarted,
  }));

  const {
    startTime,
    timerOffset,
    myTurn,
    white,
    position,
    blackKingCanCastle,
  } = useSelector((state) => ({
    startTime: state.board.startTime,
    timerOffset: state.board.currentTimerOffset,
    myTurn: state.board.myTurn,
    white: state.board.white,
    position: state.board.position,
    blackKingCanCastle: state.board.blackKingCanCastle,
  }));
  const myTimer = useTimer();
  const oppTimer = useTimer();
  const pingRef = useRef(null);
  const [play] = useSound("/move.mp3");

  const onBestMoveFound = useCallback(
    (startingX, startingY, endingX, endingY) => {
      dispatch(setActivePieceAtSquare({ x: startingX, y: startingY }));
      console.log(position);
      if (position[endingX][endingY].piece !== null) {
        console.log("NORMAL CAPTURE");
        dispatch(
          capturePiece({
            toBeCaptured: position[endingX][endingY].piece,
            enPassant: false,
          })
        );
      } else {
        if (
          position[startingX][startingY].piece?.type === 1 &&
          startingY !== endingY
        ) {
          console.log("EP CAPTURE");
          dispatch(
            capturePiece({
              toBeCaptured: {
                x: startingX,
                y: endingY,
                type: 1,
                white: false,
              },
              enPassant: true,
            })
          );
        } else {
          console.log("NORMAL MOVE");
          if (
            blackKingCanCastle &&
            endingX === 0 &&
            (endingY === 2 || endingY === 6) &&
            startingY === 4
          ) {
            console.log("CASTLE");
            if (endingY === 2) {
              dispatch(castleKing({ white: false, short: false }));
            } else {
              dispatch(castleKing({ white: false, short: true }));
            }
          } else {
            dispatch(changePieceAtSquare({ x: endingX, y: endingY }));
          }
        }
      }
    },
    [position, blackKingCanCastle]
  );
  const {
    bestMove,
    engineMessages,
    findBestMove,
    engineInitialized,
    engineReady,
    engineWorking,
  } = useStockfish(onBestMoveFound);

  useEffect(() => {
    dispatch(setEngine());
    const sid = localStorage.getItem("sessionID");
    if (sid) {
      if (!inGameRoom && gameID) {
        socket.emit("joinGameLobby", gameID);
      }
      socket.auth = { sid };

      socket.connect();
    } else {
      // router.push("/");
    }
  }, []);
  useEffect(() => {
    socket.on("sessionStart", (sid, un, uid, gid) => {
      dispatch(setSession({ sid, un, uid, gid }));
      if (gid && !inGameRoom) {
        socket.emit("joinGameLobby", gid);
      } else {
        //router.push("/");
      }
    });
    socket.on("c2sr", (t, t2) => {
      const d = Math.abs(dayjs(t).diff(dayjs(t2).utc()));
      dispatch(setPing(d));
    });
    socket.on("gameRoomJoined", (gid, messages) => {
      setInGameRoom(true);
      dispatch(setChatOnReconnect(messages)); //
      socket.emit("readyToPlay", gid, true);
    });
    socket.on("reconnectingToGame", (g) => {
      setInGameRoom(true);
      dispatch(setFirstMove());
      dispatch(setEngine());
      dispatch(pushEngineNotation(g.engineNotation));
      dispatch(setChatOnReconnect(g.messages));
      dispatch(setNotationOnReconnnect(g.algebraicNotation));
      dispatch(setMoveTimesOnReconnect(g.moveTimes));
      dispatch(setTakenPiecesOnReconnect(g.capturedPieces));
      const w = true;
      const gameType = g.gameType;
      const opponentData = {
        username: "Stockfish 11",
        connected: true,
      };
      dispatch(setWhite(w));

      let offsetW = 0;
      let offsetB = 0;

      g.moveTimes.forEach((t, i) => {
        if (i === 0 || i % 2 === 0) {
          offsetW += t;
        } else if (i % 2 !== 0) {
          offsetB += t;
        }
      });
      dispatch(setTimerOffset({ offsetW, offsetB }));
      //game started

      const startTime = g.gameStartTime;
      let whiteTurn;
      if (g.moveTimes.length === 0) {
        whiteTurn = true;
      } else {
        if (g.moveTimes.length % 2 !== 0) {
          whiteTurn = false;
        } else {
          whiteTurn = true;
        }
      }
      myTimer.initTimer(startTime, 10, () => socket.emit("endGame", "timeout"));
      oppTimer.initTimer(startTime, 10, () => {});
      const lastMoveTime = dayjs(startTime)
        .utc()
        .add(offsetB + offsetW);
      const diffToReconnect = Math.abs(lastMoveTime.diff());
      const s = lastMoveTime.toISOString();
      dispatch(setMoveInTime(s));
      const myOffset = w ? offsetW : offsetB;
      const oppOffset = w ? offsetB : offsetW;
      if (whiteTurn === w) {
        dispatch(setMyTurn(true));
        //if its my move, get last move time from move time list
        const newOffset = myOffset + diffToReconnect;
        myTimer.resumeTimerWithOffset(newOffset);
        oppTimer.updateTimerToOffset(oppOffset);
        //set opptimer and pause
      } else {
        dispatch(setMyTurn(false));
        const newOffset = oppOffset + diffToReconnect;
        oppTimer.resumeTimerWithOffset(newOffset);
        myTimer.updateTimerToOffset(myOffset);
        if (engineInitialized && engineReady && !engineWorking) {
          findBestMove(g.engineNotation);
        }
      }
      dispatch(setInGameData({ gameType, w, startTime, opponentData }));
      //init timer and ..
      //resume timer with my offset plus the diff between last move made and now
      //set other data
      //else
      //set other data and init timers, new method to set and pause timer
      dispatch(setGameStartTime(startTime));
      setInGameRoom(true);
      whitelocal.current = w;
      dispatch(setGameStarted());
      const lastMove = g.lastMove.at(-1);
      if (g.gameStates.at(-1)[lastMove[2]][lastMove[3]].piece?.type === 1) {
        const xDiff = lastMove[0] - lastMove[2];
        if (Math.abs(xDiff) === 2) {
          dispatch(setEnPassant({ lastMove }));
        }
      }
      dispatch(setPosition(g.gameStates.at(-1)));
      dispatch(resetPieceState());
    });
    socket.on("gameReadyToStart", (g) => {
      dispatch(setChatOnReconnect(g.messages)); //
      const sid = localStorage.getItem("sessionID");
      const w = true; //
      const gameType = "Engine";
      const opponentData = {
        //
        username: "Stockfish 11",
        connected: "true",
      };
      dispatch(setWhite(w));
      dispatch(setMyTurn(w));
      setInGameRoom(true);

      dispatch(setInGameData({ gameType, w, startTime, opponentData }));
      whitelocal.current = w;
      dispatch(setPosition(g.gameStates.at(-1)));
      dispatch(resetPieceState());
    });
    socket.on("gameStartTime", (startTime) => {
      myTimer.initTimer(startTime, 10, () => socket.emit("endGame", "timeout"));
      oppTimer.initTimer(startTime, 10, () => {});
      dispatch(setGameStartTime(startTime));
      if (whitelocal.current) {
        oppTimer.resumeTimerWithOffset(0);
      }
    });
    socket.on("incomingMessage", (m) => {
      dispatch(addChatMessage(m)); //
    });
    socket.on("firstMove", (position, notation, lastMove, engineNotation) => {
      let offsetW = 0;
      let offsetB = 0;
      dispatch(setMoveInTime(dayjs().utc().toISOString()));
      dispatch(pushMoveTime(0));
      dispatch(setLastMove(lastMove));
      dispatch(setGameStarted());
      //dispatch(setFirstMove());
      dispatch(setMyTurn(false));
      dispatch(setTimerOffset({ offsetW, offsetB }));
      //dispatch(setPosition(position));
      dispatch(pushNewNotation(notation));
      dispatch(pushEngineNotation(engineNotation));
      //dispatch(resetPieceState());
      if (engineInitialized && engineReady && !engineWorking) {
        findBestMove(engineNotation);
      }
    });
    socket.on(
      "engineMoveIn",
      (p, t, notation, lastMove, captured, engineNotation) => {
        play();
        dispatch(setGameStarted());
        dispatch(setMoveInTime(dayjs().utc().toISOString()));

        if (t) {
          dispatch(pushMoveTime(t.at(-1)));
          let offsetW = 0;
          let offsetB = 0;

          t.forEach((t, i) => {
            if (i === 0 || i % 2 === 0) {
              offsetW += t;
            } else if (i % 2 !== 0) {
              offsetB += t;
            }
          });
          dispatch(setTimerOffset({ offsetW, offsetB }));
          dispatch(setMyTurn(true));
        }
        if (p[lastMove[2]][lastMove[3]].piece?.type === 1) {
          const xDiff = lastMove[0] - lastMove[2];
          if (Math.abs(xDiff) === 2) {
            dispatch(setEnPassant({ lastMove }));
          }
        }

        dispatch(setPosition(p));

        dispatch(pushNewNotation(notation));
        dispatch(resetPieceState());
      }
    );
    socket.on(
      "newPosition",
      (p, t, notation, lastMove, captured, engineNotation) => {
        dispatch(setGameStarted());
        dispatch(setMoveInTime(dayjs().utc().toISOString()));
        dispatch(setLastMove(lastMove));

        if (p[lastMove[2]][lastMove[3]].piece?.type === 1) {
          const xDiff = lastMove[0] - lastMove[2];
          if (Math.abs(xDiff) === 2) {
            dispatch(setEnPassant({ lastMove }));
          }
        }
        //dispatch(setPosition(p));
        dispatch(pushEngineNotation(engineNotation));
        dispatch(pushNewNotation(notation));
        findBestMove(engineNotation);
        //dispatch(resetPieceState());
      }
    );
    socket.on("playerDisconnect", (messages) => {
      dispatch(setOpponentConnection(false));
      dispatch(setChatOnReconnect(messages));
    });
    socket.on("playerReconnected", (messages) => {
      dispatch(setOpponentConnection(true));
      dispatch(setChatOnReconnect(messages));
    });

    socket.on("gameEnded", (result) => {
      dispatch(setMyTurn(false));
      dispatch(setLastMove([-1, -1, -1, -1]));
      dispatch(resetAll());
      dispatch(endGame());
      myTimer.stopTimer();
      oppTimer.stopTimer();
      alert(`Winner: ${result.winnerID} - won by: ${result.wonBy}`);
    });

    socket.on("connect_error", (err) => {
      if (err.message === "sidInvalid") {
        router.push("/");
      }
    });
    return () => {
      socket.off("c2sr");
      socket.off("gameEnded");
      socket.off("playerReconnected");
      socket.off("playerDisconnect");
      socket.off("newPosition");
      socket.off("firstMove");
      socket.off("incomingMessage");
      socket.off("gameStartTime");
      socket.off("gameReadyToStart");
      socket.off("reconnectingToGame");
      socket.off("gameRoomJoined");
      socket.off("gameEnded");
      socket.removeAllListeners();
    };
  });

  return (
    <div className='flex flex-row gap-5 overflow-x-hidden'>
      <Sidebar />

      <div className='flex w-[85vmin] md:w-max mx-auto md:mx-0 flex-col lg:flex-row gap-3 md:ml-48 overflow-x-hidden'>
        <Board play={play} />
        <GameInfo myTimer={myTimer} oppTimer={oppTimer} engineMode={true} />
      </div>
    </div>
  );
};

export default PlayEngine;
