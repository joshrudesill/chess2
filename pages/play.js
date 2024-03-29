import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
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
  resetAll,
  setMouseDragging,
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
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const Play = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [inGameRoom, setInGameRoom] = useState(false);
  const whitelocal = useRef(null);

  const { gameID, sessionID, gameStarted } = useSelector((state) => ({
    gameID: state.app.sessionDetails.gameID,
    sessionID: state.app.sessionDetails.sessionID,
    gameStarted: state.app.inGameData.gameStarted,
  }));

  const { startTime, timerOffset, myTurn, white } = useSelector((state) => ({
    startTime: state.board.startTime,
    timerOffset: state.board.currentTimerOffset,
    myTurn: state.board.myTurn,
    white: state.board.white,
  }));
  const myTimer = useTimer();
  const oppTimer = useTimer();
  const pingRef = useRef(null);
  const [play] = useSound("/move.mp3");

  /*useEffect(() => {
    pingRef.current = setInterval(() => {
      socket.emit("c2s", dayjs().utc().toISOString());
    }, 5000);
    return () => {
      clearInterval(pingRef.current);
    };
  }, []);*/

  useEffect(() => {
    const sid = localStorage.getItem("sessionID");
    if (sid) {
      if (!inGameRoom && gameID) {
        socket.emit("joinGameLobby", gameID);
      }
      socket.auth = { sid };

      socket.connect();
    } else {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    socket.on("sessionStart", (sid, un, uid, gid) => {
      dispatch(setSession({ sid, un, uid, gid }));
      if (gid && !inGameRoom) {
        socket.emit("joinGameLobby", gid);
      } else {
        router.push("/");
      }
    });
    socket.on("c2sr", (t, t2) => {
      const d = Math.abs(dayjs(t).diff(dayjs(t2).utc()));
      dispatch(setPing(d));
    });
    socket.on("gameRoomJoined", (gid, messages) => {
      setInGameRoom(true);
      dispatch(setChatOnReconnect(messages));
      socket.emit("readyToPlay", gid);
    });
    socket.on("reconnectingToGame", (g) => {
      setInGameRoom(true);
      dispatch(setFirstMove());
      dispatch(setChatOnReconnect(g.messages));
      dispatch(setNotationOnReconnnect(g.algebraicNotation));
      dispatch(setMoveTimesOnReconnect(g.moveTimes));
      dispatch(setTakenPiecesOnReconnect(g.capturedPieces));
      const w = g.players[0].sid === sessionID ? true : false;
      const gameType = g.gameType;
      const opponent = g.players.find((p) => p.sid !== sessionID);
      const opponentData = {
        username: opponent.un,
        connected: opponent.connected,
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
      dispatch(setChatOnReconnect(g.messages));
      const sid = localStorage.getItem("sessionID");
      const w = g.players[0].sid === sid ? true : false;
      const gameType = g.gameType;
      const opponent = g.players.find((p) => p.sid !== sid);
      const opponentData = {
        username: opponent.un,
        connected: opponent.connected,
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
      dispatch(addChatMessage(m));
    });
    socket.on("firstMove", (position, notation, lastMove) => {
      let offsetW = 0;
      let offsetB = 0;
      dispatch(setMoveInTime(dayjs().utc().toISOString()));
      dispatch(pushMoveTime(0));
      dispatch(setLastMove(lastMove));
      dispatch(setGameStarted());
      dispatch(setFirstMove());
      dispatch(setTimerOffset({ offsetW, offsetB }));
      dispatch(setMyTurn(true));
      dispatch(setPosition(position));
      dispatch(pushNewNotation(notation));
      dispatch(resetPieceState());
    });
    socket.on("newPosition", (p, t, notation, lastMove, captured) => {
      play();
      dispatch(setGameStarted());
      dispatch(setMoveInTime(dayjs().utc().toISOString()));
      dispatch(setLastMove(lastMove));
      if (captured !== null) {
        dispatch(
          pushTakenPiece({ white: captured.white, type: captured.type })
        );
      }
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
    });
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
      dispatch(endGame());
      dispatch(setLastMove([-1, -1, -1, -1]));
      dispatch(resetAll());
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

  useEffect(() => {
    if (myTurn && gameStarted) {
      var myOffset = 0;
      if (white) {
        myOffset = timerOffset.white;
      } else {
        myOffset = timerOffset.black;
      }
      myTimer.resumeTimerWithOffset(myOffset);
      oppTimer.stopTimer();
    } else if (!myTurn && gameStarted) {
      //start opp timer with delay
      var oppOffset = 0;
      if (white) {
        oppOffset = timerOffset.black;
      } else {
        oppOffset = timerOffset.white;
      }
      oppTimer.resumeTimerWithOffset(oppOffset);
      //resume timer from where its at, possibly send time stamps
      myTimer.stopTimer();
    }
  }, [myTurn]);
  return (
    <div
      className='flex flex-row gap-5 overflow-x-hidden'
      onMouseUp={() => dispatch(setMouseDragging(false))}
    >
      <Sidebar />
      <div className='flex w-[85vmin] md:w-max mx-auto md:mx-0 flex-col lg:flex-row gap-3 md:ml-48 overflow-x-hidden'>
        <Board play={play} />
        <GameInfo myTimer={myTimer} oppTimer={oppTimer} engineMode={false} />
      </div>
    </div>
  );
};
export default Play;
