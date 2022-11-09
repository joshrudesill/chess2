import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSession } from "../features/app/appSlice";
import socket from "../socket";

const FindMatch = () => {
  const dispatch = useDispatch();
  const [sessionReady, setSessionReady] = useState(false);
  const [players, setPlayers] = useState(0);
  var interval;
  const loadSessionDetails = async (sessionID) => {
    const result = await fetch(
      `http://localhost:8080/loadsession?sid=${sessionID}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const session = await result.json();
    if (session) {
      console.log(session);
      const sid = session.sessionID;
      const uid = session.userID;
      const un = session.username;
      socket.auth = { sid, uid, un };
      socket.connect();
    } else {
      const un = "testUser";
      socket.auth = { un };
      socket.connect();
    }
  };
  const saveSessionDetails = async (session) => {
    const result = await fetch(`http://localhost:8080/savesession`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    });
    if (result.status === 200) {
      setSessionReady(true);
    }
  };
  const joinQueue = () => {
    socket.emit("join queue");
  };
  const beginInterval = () => {
    interval = setInterval(() => {
      console.log("requesting game");
      socket.emit("request game");
    }, 1500);
  };
  const endInterval = () => {
    clearInterval(interval);
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
      if (err.message === "db required") {
        loadSessionDetails(err.data.content);
      }
    });
    socket.on("session started", (sid, uid, un) => {
      localStorage.setItem("sessionID", sid);
      dispatch(setSession({ sid, uid, un }));
      saveSessionDetails({ sid: sid, uid: uid, un: un });
    });
    socket.on("players in queue", (num) => {
      setPlayers(num);
    });
    socket.on("queue joined", () => {
      beginInterval();
    });
    socket.on("game created", (gameID) => {
      endInterval();
      console.log("interval ended");
    });
  }, []);
  return (
    <div className='container'>
      <div className='columns'>
        <div className='column is-4'>
          <button
            className='button mt-6'
            disabled={!sessionReady}
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
