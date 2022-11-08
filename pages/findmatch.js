import { useEffect, useState } from "react";
import socket from "../socket";

const FindMatch = () => {
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
      socket.emit();
    }
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
      saveSessionDetails({ sid: sid, uid: uid, un: un });
    });
  }, []);
  return <div></div>;
};

export default FindMatch;
