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
} from "../features/board/boardSlice";
import {
  setGame,
  setGameStarted,
  setInGameData,
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
      //check for dc stuff
      setInGameRoom(true);
      const gameType = g.gameType;
      const w = g.players[0].sid === sessionID ? true : false;
      const myTurn = w;
      const startTime = g.gameStartTime;
      const gameStarted = startTime ? true : false;
      const opponent = g.players.find((p) => p.sid !== sessionID);
      const opponentData = {
        username: opponent.username,
        connected: opponent.connected,
      };
      dispatch(setInGameData({ gameType, w, myTurn, startTime, opponentData }));
      dispatch(setMyTurn(w));
      dispatch(setWhite(w));
      whitelocal.current = w;

      if (gameStarted) {
        dispatch(setGameStarted());
      }
      dispatch(setPosition(g.gameStates.at(-1)));
    });
    socket.on("gameStartTime", (startTime) => {
      myTimer.initTimer(startTime, 10);
      oppTimer.initTimer(startTime, 10);
      dispatch(setGameStartTime(startTime));
    });
    socket.on("firstMove", (position) => {
      let offsetW = 0;
      let offsetB = 0;
      dispatch(setGameStarted());
      dispatch(setFirstMove());
      dispatch(setTimerOffset({ offsetW, offsetB }));
      dispatch(setMyTurn(true));
      dispatch(setPosition(position));
    });
    socket.on("newPosition", (p, t) => {
      dispatch(setGameStarted());
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
        console.log("OB: ", offsetB);
        console.log("OW: ", offsetW);
        dispatch(setTimerOffset({ offsetW, offsetB }));
        dispatch(setMyTurn(true));
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

  useEffect(() => {
    if (myTurn && gameStarted) {
      console.log(white);
      var myOffset = 0;
      var oppOffset = 0;
      if (white) {
        myOffset = timerOffset.white;
        oppOffset = timerOffset.black;
      } else {
        myOffset = timerOffset.black;
        oppOffset = timerOffset.white;
      }
      myTimer.resumeTimerWithOffset(myOffset, oppOffset);
      oppTimer.stopTimer();
    } else if (!myTurn && gameStarted) {
      //start opp timer with delay
      var myOffset = 0;
      var oppOffset = 0;
      if (white) {
        myOffset = timerOffset.white;
        oppOffset = timerOffset.black;
      } else {
        myOffset = timerOffset.black;
        oppOffset = timerOffset.white;
      }
      oppTimer.resumeTimerWithOffset(myOffset, oppOffset);
      //resume timer from where its at, possibly send time stamps
      myTimer.stopTimer();
    }
  }, [myTurn]);
  return (
    <div className='flex flex-row gap-5 overflow-x-hidden'>
      <Sidebar />
      <div className='flex w-[85vmin] md:w-max mx-auto md:mx-0 flex-col lg:flex-row gap-3 md:ml-48 overflow-x-hidden'>
        {myTimer.formattedTime}
        <br />
        {oppTimer.formattedTime}
        <br />
        {myTimer.intermediateTimeRef.current
          ? myTimer.intermediateTimeRef.current.format(" YYYY-MM-DDTHH:mm:SSS")
          : "f"}
        <br />
        {oppTimer.intermediateTimeRef.current
          ? oppTimer.intermediateTimeRef.current.format(" YYYY-MM-DDTHH:mm:SSS")
          : "f"}
        <Board />
        <GameInfo />
      </div>
    </div>
  );
};
export default Play;
