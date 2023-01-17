import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGame, setSession } from "../features/app/appSlice";
import socket from "../socket";

const FindMatch = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [players, setPlayers] = useState(0);
  const sessionID = useSelector((state) => state.app.sessionDetails.sessionID);
  const gameID = useSelector((state) => state.app.sessionDetails.gameID);
  const joinQueue = () => {
    socket.emit("joinQueue");
  };

  useEffect(() => {
    const sid = localStorage.getItem("sessionID");
    if (sid) {
      socket.auth = { sid };
      socket.connect();
    } else {
      const un = "testUser" + Math.floor(Math.random() * 500).toString();
      socket.auth = { un };
      socket.connect();
    }
  }, []);
  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "sidInvalid") {
        const un = "testUser" + Math.floor(Math.random() * 500).toString();
        socket.auth = { un };
        socket.connect();
      }
    });
    socket.on("sessionStart", (sid, un, uid, gid) => {
      localStorage.setItem("sessionID", sid);
      dispatch(setSession({ sid, un, uid, gid }));
      if (gid !== null) {
        router.push("/play");
      }
    });
    socket.on("gameRoomCreated", (gid) => {
      dispatch(setGame(gid));
      router.push("/play");
    });
    return () => {
      socket.off("connect");
      socket.off("sessionStart");
      socket.off("connect_error");
      socket.off("gameRoomCreated");
    };
  });
  return (
    <div className='container w-screen'>
      <div className='flex flex-col mt-48'>
        <button
          className='bg-white border p-5 mx-auto cursor-pointer'
          onClick={() => joinQueue()}
        >
          Start Search
        </button>
        <button
          className='bg-white border p-5 mx-auto mt-5 cursor-pointer'
          onClick={() => localStorage.removeItem("sessionID")}
        >
          Clear
        </button>
        <div className='text-white mx-auto mt-5 '>SID: {sessionID}</div>
        <div className='text-white mx-auto mt-5 '>GID: {gameID}</div>
      </div>
    </div>
  );
};

export default FindMatch;
