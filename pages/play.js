import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/board";
import { setPosition } from "../features/board/boardSlice";
import socket from "../socket";
const Play = () => {
  const [gr, setGR] = useState(false);
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.app.sessionDetails.gameID);
  const sessionID = useSelector((state) => state.app.sessionDetails.sessionID);
  useEffect(() => {
    socket.emit("ready to play", gameState);
    socket.on("game ready", (gs) => {
      setGR(true);
      dispatch(setPosition(gs));
    });
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
