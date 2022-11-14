import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "./socket";

const sendMove = () => {
  const gameState = useSelector((state) => state.app.sessionDetails.gameID);
  const position = useSelector((state) => state.board.position);
  socket.emit("piece move", position, gameState);
  return null;
};
module.exports = { sendMove };
