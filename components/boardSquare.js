import { useDispatch, useSelector } from "react-redux";
import {
  changePieceAtSquare,
  setActivePiece,
  resetActivePiece,
  capturePiece,
} from "../features/board/boardSlice";
import {
  FlagIcon,
  HandThumbUpIcon,
  TrophyIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Bishop from "./pieces/bishop";
import King from "./pieces/king";
import Knight from "./pieces/knight";
import Pawn from "./pieces/pawn";
import Queen from "./pieces/queen";
import Rook from "./pieces/rook";
import socket from "../socket";
const BoardSquare = ({ squareData, j, e }) => {
  const dispatch = useDispatch();
  const activePiece = useSelector((state) => state.board.activePiece);
  const myTurn = useSelector((state) => state.app.inGameData.myTurn);

  const onMouseDown = () => {
    if (activePiece === null && squareData.piece !== null) {
      dispatch(setActivePiece(squareData.piece));
    } else if (activePiece && squareData.piece === null) {
      if (
        activePiece.legalMoves.some((e) => {
          if (e.x === squareData.x && e.y == squareData.y) {
            return true;
          }
          return false;
        })
      ) {
        dispatch(changePieceAtSquare(squareData));
      }
    } else if (
      activePiece &&
      squareData.piece &&
      activePiece.white === squareData.piece.white
    ) {
      dispatch(setActivePiece(squareData.piece));
    } else if (
      activePiece &&
      squareData.piece &&
      activePiece.white !== squareData.piece.white
    ) {
      if (
        activePiece.legalMoves.some((e) => {
          if (e.x === squareData.x && e.y == squareData.y) {
            return true;
          }
          return false;
        })
      ) {
        dispatch(capturePiece({ toBeCaptured: squareData.piece }));
      }
    }
  };

  const onMouseUp = () => {
    if (activePiece !== null && squareData.piece === null) {
      if (
        activePiece.legalMoves.some((e) => {
          if (e.x === squareData.x && e.y == squareData.y) {
            return true;
          }
          return false;
        })
      ) {
        dispatch(changePieceAtSquare(squareData));
      }
    } else if (
      activePiece &&
      squareData.piece &&
      activePiece.white !== squareData.piece.white
    ) {
      if (
        activePiece.legalMoves.some((e) => {
          if (e.x === squareData.x && e.y == squareData.y) {
            return true;
          }
          return false;
        })
      ) {
        dispatch(capturePiece({ toBeCaptured: squareData.piece }));
      }
    }
  };
  // pieces into components which handle available moves property

  /*
    0 - King
    1 - Pawn
    2 - Rook
    3 - Bishop
    4 - Knight
    5 - Queen
*/

  if (squareData.piece !== null && squareData.piece.type === 2) {
    return (
      <div
        className={`aspect-square flex justify-center items-center cursor-pointer ${
          j % 2 === 0
            ? e % 2 === 0
              ? "bg-emerald-800"
              : "bg-stone-400"
            : e % 2 !== 0
            ? "bg-emerald-800 "
            : "bg-stone-400"
        }`}
      >
        <Rook piece={squareData.piece} />
      </div>
    );
  }
  if (squareData.piece !== null && squareData.piece.type === 1) {
    return (
      <div
        className={`aspect-square flex justify-center items-center cursor-pointer ${
          j % 2 === 0
            ? e % 2 === 0
              ? "bg-emerald-800"
              : "bg-stone-400"
            : e % 2 !== 0
            ? "bg-emerald-800 "
            : "bg-stone-400"
        }`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <Pawn piece={squareData.piece} />
      </div>
    );
  }
  if (squareData.piece !== null && squareData.piece.type === 0) {
    return (
      <div
        className={`aspect-square flex justify-center items-center cursor-pointer ${
          j % 2 === 0
            ? e % 2 === 0
              ? "bg-emerald-800"
              : "bg-stone-400"
            : e % 2 !== 0
            ? "bg-emerald-800 "
            : "bg-stone-400"
        }`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <King piece={squareData.piece} />
      </div>
    );
  }
  if (squareData.piece !== null && squareData.piece.type === 3) {
    return (
      <div
        className={`aspect-square flex justify-center items-center cursor-pointer ${
          j % 2 === 0
            ? e % 2 === 0
              ? "bg-emerald-800"
              : "bg-stone-400"
            : e % 2 !== 0
            ? "bg-emerald-800 "
            : "bg-stone-400"
        }`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <Bishop piece={squareData.piece} />
      </div>
    );
  }
  if (squareData.piece !== null && squareData.piece.type === 4) {
    return (
      <div
        className={`aspect-square flex justify-center items-center cursor-pointer ${
          j % 2 === 0
            ? e % 2 === 0
              ? "bg-emerald-800"
              : "bg-stone-400"
            : e % 2 !== 0
            ? "bg-emerald-800 "
            : "bg-stone-400"
        }`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <Knight piece={squareData.piece} />
      </div>
    );
  }
  if (squareData.piece !== null && squareData.piece.type === 5) {
    return (
      <div
        className={`aspect-square flex justify-center items-center cursor-pointer ${
          j % 2 === 0
            ? e % 2 === 0
              ? "bg-emerald-800"
              : "bg-stone-400"
            : e % 2 !== 0
            ? "bg-emerald-800 "
            : "bg-stone-400"
        }`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <Queen piece={squareData.piece} />
      </div>
    );
  }
  if (squareData.piece === null) {
    return (
      <div
        className={`aspect-square flex justify-center items-center ${
          j % 2 === 0
            ? e % 2 === 0
              ? "bg-emerald-800"
              : "bg-stone-400"
            : e % 2 !== 0
            ? "bg-emerald-800 "
            : "bg-stone-400"
        }`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      ></div>
    );
  }
};

export default BoardSquare;
