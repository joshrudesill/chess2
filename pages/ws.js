import { useEffect, useState } from "react";
import socket from "../socket";
const Ws = () => {
  const [users, setUsers] = useState([]);
  const [rid, setRID] = useState();
  const [moves, setMoves] = useState([]);
  var inter;

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      console.log("sessionID exists");
      socket.auth = { sessionID };
      socket.connect();
    } else {
      const username = "asdf" + Math.floor(Math.random() * 100).toString();
      socket.auth = { username };
      socket.connect();
    }
    socket.on("session", ({ sessionID, userID }) => {
      socket.auth = { sessionID };
      localStorage.setItem("sessionID", sessionID);
      socket.userID = userID;
    });

    socket.on("users", (users) => {
      setUsers(users);
    });

    socket.on("user connected", (users) => {
      setUsers(users);
    });
    socket.on("user disconnected", (users) => {
      setUsers(users);
    });
    socket.on("game room created", (roomID) => {
      clearInterval(inter);
      setRID(roomID);
      socket.emit("join_room", roomID);
    });
    socket.on("game not found", () => {
      setTimeout(() => socket.emit("request_game"), 10000);
    });
    socket.on("move out", (m) => {
      const newMoves = moves.concat(m);
      setMoves(newMoves);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("session");
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
    };
  });
  useEffect(() => {
    if (!inter) {
      inter = setInterval(() => {
        socket.emit("request_game");
      }, 3000);
    }
  }, []);
  return (
    <div className='container'>
      <div className='content'>
        <div className='h1'>{rid ? rid : "no room"}</div>
        <button className='button' onClick={() => socket.emit("request_game")}>
          BEGIN
        </button>
        <button onClick={() => localStorage.clear()} className='button'>
          Clear
        </button>
        {users.map((u) => (
          <div className='p' key={u.userID}>
            {u.username}
          </div>
        ))}
        {rid ? (
          <>
            <button
              className='button'
              onClick={() => socket.emit("move", "a", rid)}
            >
              A
            </button>
            <button
              className='button'
              onClick={() => socket.emit("move", "s", rid)}
            >
              S
            </button>
          </>
        ) : (
          <></>
        )}
        <div className='p'>{JSON.stringify(moves)}</div>
      </div>
    </div>
  );
};

export default Ws;
