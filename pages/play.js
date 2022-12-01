import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/board";
import { setPosition } from "../features/board/boardSlice";
import { setGame, setSession } from "../features/app/appSlice";
import socket from "../socket";
import Sidebar from "../components/sidebar";
import GameInfo from "../components/gameInfo";

const Play = () => {
  const a = Array.from(Array(8).keys());
  const dispatch = useDispatch();
  const router = useRouter();
  const [inGameRoom, setInGameRoom] = useState(false);
  const [gameReady, setGameReady] = useState(false);
  const gameID = useSelector((state) => state.app.sessionDetails.gameID);
  const sessionID = useSelector((state) => state.app.sessionDetails.sessionID);
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
      console.log("gameRoom true");
    });
    socket.on("gameReadyToStart", (p) => {
      setInGameRoom(true);
      setGameReady(true);
      dispatch(setPosition(p));
    });
    socket.on("newPosition", (p) => {
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
