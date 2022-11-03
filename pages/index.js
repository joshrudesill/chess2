import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Board from "../components/board";
import io from "Socket.IO-client";

export default function Home() {
  const activePiece = useSelector((state) => state.board.activePiece);
  const check = useSelector((state) => state.board.kingData.squaresToBeBlocked);
  const [Socket, st] = useState("");

  return (
    <div className='container'>
      <div>
        {activePiece
          ? `[ ${activePiece.x} , ${activePiece.y} ] --- ${JSON.stringify(
              activePiece.legalMoves
            )}`
          : "NONE"}
        <br />
        {check ? JSON.stringify(check) : "NOT"}

        <button className='button' onClick={() => ping()}>
          ping
        </button>
      </div>
      <Board />
    </div>
  );
}
