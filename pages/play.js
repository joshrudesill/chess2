import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/board";
import { setPosition } from "../features/board/boardSlice";
import { setGame, setSession } from "../features/app/appSlice";
import socket from "../socket";
const Play = () => {
  const [gr, setGR] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const gameState = useSelector((state) => state.app.sessionDetails.gameID);
  const sessionID = useSelector((state) => state.app.sessionDetails.sessionID);

  useEffect(() => {
    const sid = localStorage.getItem("sessionID");
    if (sid) {
      socket.auth = { sid };
      socket.connect();
    } else {
      router.push("/findmatch");
    }
    if (gameState && !gr) {
      socket.emit("ready to play", gameState);
    }

    socket.on("game ready", (gs) => {
      setGR(true);
      dispatch(setPosition(gs));
    });
    socket.on("new postition", (p) => {
      dispatch(setPosition(p));
    });
    socket.on("session started", (sid, uid, un, gid, ig) => {
      if (ig && gid) {
        console.log("attempting reconnect");
        setGR(true);
        dispatch(setSession({ sid, uid, un, gid, ig }));
        socket.emit("reconnecting to game", gid);
      } else {
        router.push("/findmatch");
      }
    });
    socket.on("reload gamestate", (gs) => {
      console.log("gamestate reeived");
      setGR(true);
      dispatch(setPosition(gs));
    });
    return () => {
      socket.off("game ready");
      socket.off("new postition");
      socket.off("session started");
      socket.off("reload gamestate");
    };
  });
  return (
    <>
      <div>{gameState}</div>
      <button onClick={() => socket.emit("end game", gameState)}>
        End Game
      </button>
      <p>{gr ? "game ready" : "not ready"}</p>
      <Board />
    </>
  );
};
export default Play;
