import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/board";
import { setPosition } from "../features/board/boardSlice";
import {
  setGame,
  setGameStarted,
  setGameStartTime,
  setInGameData,
  setSession,
} from "../features/app/appSlice";
import socket from "../socket";
import Sidebar from "../components/sidebar";
import GameInfo from "../components/gameInfo";
import useTimer from "../util/usetimer";
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");

const Play = () => {
  const a = Array.from(Array(8).keys());
  const dispatch = useDispatch();
  const router = useRouter();
  const [inGameRoom, setInGameRoom] = useState(false);
  const [gameReady, setGameReady] = useState(false);
  const gameID = useSelector((state) => state.app.sessionDetails.gameID);
  const sessionID = useSelector((state) => state.app.sessionDetails.sessionID);
  const gameStarted = useSelector((state) => state.app.inGameData.gameStarted);
  const startTime = useSelector((state) => state.app.inGameData.startTime);
  const {
    ms,
    isPaused,
    isRunning,
    startTimeRef,
    startTimer,
    stopTimer,
    resumeTimer,
    clearTimer,
  } = useTimer(startTime);
  useEffect(() => {
    const sid = localStorage.getItem("sessionID");
    if (sid) {
      if (!inGameRoom && gameID) {
        socket.emit("joinGameLobby", gameID);
      }
      console.log("connect");
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
    socket.on("gameRoomJoined", (gid) => {
      setInGameRoom(true);
      socket.emit("readyToPlay", gid);
    });
    socket.on("gameReadyToStart", (g) => {
      setInGameRoom(true);
      setGameReady(true);
      const gameType = g.gameType;
      const white = g.players[0].sid === sessionID ? true : false;
      const myTurn = white;
      const startTime = g.gameStartTime;
      const gameStarted = startTime ? true : false;
      const opponent = g.players.find((p) => p.sid !== sessionID);
      const opponentData = {
        username: opponent.username,
        connected: opponent.connected,
      };
      dispatch(
        setInGameData({ gameType, white, myTurn, startTime, opponentData })
      );
      if (gameStarted) {
        dispatch(setGameStarted());
      }
      dispatch(setPosition(g.gameStates.at(-1)));
    });
    socket.on("gameStartTime", (startTime) => {
      dispatch(setGameStarted());
      dispatch(setGameStartTime(startTime));
    });
    socket.on("newPosition", (p) => {
      if (!gameStarted) {
        dispatch(setGameStarted());
        socket.emit("setGameStartTime", dayjs().utc().toDate());
      }
      dispatch(setPosition(p));
    });
    socket.on("connect_error", (err) => {
      if (err.message === "sidInvalid") {
        router.push("/findmatch");
      }
    });

    return () => {};
  }, []);
  return (
    <div className='flex flex-row gap-5 overflow-x-hidden'>
      <Sidebar />
      <div className='flex w-[85vmin] md:w-max mx-auto md:mx-0 flex-col lg:flex-row gap-3 md:ml-48 overflow-x-hidden'>
        <Board />
        <GameInfo />
      </div>
    </div>
  );
};
export default Play;
