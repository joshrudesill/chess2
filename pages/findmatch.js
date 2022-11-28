import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../features/app/appSlice";
import socket from "../socket";

const FindMatch = () => {
  const dispatch = useDispatch();
  const [players, setPlayers] = useState(0);

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
    socket.on("sessionStart", (sid, un, uid) => {
      localStorage.setItem("sessionID", sid);
      dispatch(setSession({ sid: sid, un: un, uid: uid }));
    });
    return () => {
      socket.off("connect");
      socket.off("sessionStart");
      socket.off("connect_error");
    };
  });
  return (
    <div className='container'>
      <div className='columns'>
        <div className='column is-4'>
          <button
            className='bg-white border p-5 m-5 cursor-pointer'
            onClick={() => joinQueue()}
          >
            Start Search
          </button>
        </div>
        <div className='column is-4 mt-6'>Players Online: {players}</div>
      </div>
    </div>
  );
};

export default FindMatch;
