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
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const Play = () => {
  const a = Array.from(Array(8).keys());
  const dispatch = useDispatch();
  const router = useRouter();
  const [inGameRoom, setInGameRoom] = useState(false);
  const whitelocal = useRef(null);
  const gameID = useSelector((state) => state.app.sessionDetails.gameID);
  const sessionID = useSelector((state) => state.app.sessionDetails.sessionID);
  const gameStarted = useSelector((state) => state.app.inGameData.gameStarted);
  const startTime = useSelector((state) => state.board.startTime);
  const timerOffset = useSelector((state) => state.board.currentTimerOffset);
  const myTurn = useSelector((state) => state.board.myTurn);
  const white = useSelector((state) => state.board.white);
  const myTimer = useTimer(10);
  const oppTimer = useTimer(10);
  const pingRef = useRef(null);

  const endGameByTimeOut = () => {
    socket.emit("myTimeRanOut");
  };
  const endGameByCheckMate = () => {
    socket.emit("opponentCheckmated");
  };
  /*useEffect(() => {
    pingRef.current = setInterval(() => {
      socket.emit("c2s", dayjs.utc().toISOString());
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
      router.push("/findmatch");
    }
    socket.on("sessionStart", (sid, un, uid, gid) => {
      if (gid) {
        dispatch(setSession({ sid, un, uid, gid }));
        socket.emit("joinGameLobby", gid);
      } else {
        router.push("/findmatch");
      }
    });
    socket.on("c2sr", (t, t2) => {
      const d = Math.abs(dayjs(t).diff(dayjs(t2).utc()));
      dispatch(setPing(d));
    });
    socket.on("gameRoomJoined", (gid) => {
      setInGameRoom(true);
      socket.emit("readyToPlay", gid);
    });
    socket.on("reconnectingToGame", (g) => {
      dispatch(setFirstMove());
      const w = g.players[0].sid === sessionID ? true : false;
      const gameType = g.gameType;
      const opponent = g.players.find((p) => p.sid !== sessionID);
      const opponentData = {
        username: opponent.username,
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
      console.log(offsetW, offsetB);
      //game started

      const startTime = g.gameStartTime;
      const whiteTurn = g.moveTimes.length % 2 === 0;
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
      dispatch(setInGameData({ gameType, w, startTime, opponentData }));
      whitelocal.current = w;
      dispatch(setGameStarted());
      dispatch(setPosition(g.gameStates.at(-1)));
      dispatch(resetPieceState());
    });
    socket.on("gameReadyToStart", (g) => {
      const w = g.players[0].sid === sessionID ? true : false;
      const gameType = g.gameType;
      const opponent = g.players.find((p) => p.sid !== sessionID);
      const opponentData = {
        username: opponent.username,
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
      myTimer.initTimer(startTime, 10);
      oppTimer.initTimer(startTime, 10);
      dispatch(setGameStartTime(startTime));
      console.log(white);
      if (whitelocal.current) {
        oppTimer.resumeTimerWithOffset(0);
      }
    });
    socket.on("firstMove", (position) => {
      let offsetW = 0;
      let offsetB = 0;
      dispatch(setMoveInTime(dayjs().utc().toISOString()));
      dispatch(setGameStarted());
      dispatch(setFirstMove());
      dispatch(setTimerOffset({ offsetW, offsetB }));
      dispatch(setMyTurn(true));
      dispatch(setPosition(position));
      dispatch(resetPieceState());
    });
    socket.on("newPosition", (p, t) => {
      dispatch(setGameStarted());
      dispatch(setMoveInTime(dayjs().utc().toISOString()));
      if (t) {
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
      dispatch(setPosition(p));
      dispatch(resetPieceState());
    });
    socket.on("playerDisconnect", () => {
      dispatch(setOpponentConnection(false));
    });
    socket.on("playerReconnected", () => {
      dispatch(setOpponentConnection(true));
    });
    socket.on("youEndedSuccessfully", (typeOfEnd) => {
      dispatch(setMyTurn(false));
      dispatch(endGame());
      myTimer.stopTimer();
      oppTimer.stopTimer();
      alert(typeOfEnd);
    });
    socket.on("resignation", () => {
      dispatch(setMyTurn(false));
      dispatch(endGame());
      myTimer.stopTimer();
      oppTimer.stopTimer();
      alert("enemy resigned");
    });
    socket.on("connect_error", (err) => {
      if (err.message === "sidInvalid") {
        router.push("/findmatch");
      }
    });
    return () => {};
  }, []);

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
    <div className='flex flex-row gap-5 overflow-x-hidden'>
      <Sidebar />
      <div className='flex w-[85vmin] md:w-max mx-auto md:mx-0 flex-col lg:flex-row gap-3 md:ml-48 overflow-x-hidden'>
        <Board />
        <GameInfo myTimer={myTimer} oppTimer={oppTimer} />
      </div>
    </div>
  );
};
export default Play;
