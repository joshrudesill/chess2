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
    return session;
  };
  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      const sid = loadSessionDetails(sessionID);
      socket.auth = { sid };
      socket.connect();
    } else {
      const username = "testUser";
      socket.auth = { username };
      socket.connect();
    }
  }, []);
  return <div></div>;
};

export default FindMatch;
