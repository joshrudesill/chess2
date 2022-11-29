import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/board";
import { setPosition } from "../features/board/boardSlice";
import { setGame, setSession } from "../features/app/appSlice";
import socket from "../socket";
const Play = () => {
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
        dispatch(setSession({ sid: sid, un: un, uid: uid, gid: gid }));
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
    socket.on("gameReadyToStart", () => {
      setInGameRoom(true);
      setGameReady(true);
    });
    socket.on("connect_error", (err) => {
      if (err.message === "sidInvalid") {
        router.push("/findmatch");
      }
    });

    return () => {};
  }, []);
  return (
    <>
      <div className='text-white'>{gameID}</div>
      <p className='text-white'>{gameReady ? "Game Ready" : "Not ready"}</p>
      <Board />
    </>
  );
};
export default Play;
