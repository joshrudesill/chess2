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
      const un = "testUser";
      socket.auth = { un };
      socket.connect();
    }
    socket.on("connect_error", (err) => {
      if (err.message === "sidInvalid") {
        const un = "testUser";
        socket.auth = { un };
        socket.connect();
      }
    });
    socket.on("sessionStart", (sid, un, uid, gid) => {
      localStorage.setItem("sessionID", sid);
      if (gid !== null) {
        dispatch(setSession({ sid: sid, un: un, uid: uid, gid: gid }));
        router.push("/play");
      } else {
        dispatch(setSession({ sid: sid, un: un, uid: uid, gid: gid }));
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
    };
  });
  return (
    <div className='container w-screen'>
      <div className='flex flex-row mt-48'>
        <button
          className='bg-white border p-5 mx-auto cursor-pointer'
          onClick={() => joinQueue()}
        >
          Start Search
        </button>
        <div className='text-white'>{sessionID}</div>
        <div className='text-white'>{gameID}</div>
      </div>
    </div>
  );
};

export default FindMatch;
