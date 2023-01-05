import { useDispatch, useSelector } from "react-redux";
import {
  changePieceAtSquare,
  setActivePiece,
  capturePiece,
  resetPieceState,
  setFirstMove,
  resetActivePiece,
} from "../features/board/boardSlice";
import Bishop from "./pieces/bishop";
import King from "./pieces/king";
import Knight from "./pieces/knight";
import Pawn from "./pieces/pawn";
import Queen from "./pieces/queen";
import Rook from "./pieces/rook";

const BoardSquare = ({ squareData, j, e, activePiece, myTurn }) => {
  const dispatch = useDispatch();

  const onMouseDown = () => {
    if (myTurn) {
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

          dispatch(resetPieceState());
        } else {
          dispatch(resetActivePiece());
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
        //else reset active piece to null
      }
    }
  };

  const onMouseUp = () => {
    if (myTurn) {
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

          dispatch(resetPieceState());
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
        } ${
          activePiece
            ? activePiece.legalMoves.some(
                (m) => m.x === squareData.x && m.y === squareData.y
              )
              ? "border-2 border-red-600"
              : ""
            : ""
        } `}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
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
        } ${
          activePiece
            ? activePiece.legalMoves.some(
                (m) => m.x === squareData.x && m.y === squareData.y
              )
              ? "border-2 border-red-600"
              : ""
            : ""
        } `}
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
        } ${
          activePiece
            ? activePiece.legalMoves.some(
                (m) => m.x === squareData.x && m.y === squareData.y
              )
              ? "border-2 border-red-600"
              : ""
            : ""
        } `}
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
        } ${
          activePiece
            ? activePiece.legalMoves.some(
                (m) => m.x === squareData.x && m.y === squareData.y
              )
              ? "border-2 border-red-600"
              : ""
            : ""
        } `}
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
        } ${
          activePiece
            ? activePiece.legalMoves.some(
                (m) => m.x === squareData.x && m.y === squareData.y
              )
              ? "border-2 border-red-600"
              : ""
            : ""
        } `}
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
        } ${
          activePiece
            ? activePiece.legalMoves.some(
                (m) => m.x === squareData.x && m.y === squareData.y
              )
              ? "border-2 border-red-600"
              : ""
            : ""
        } `}
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
        className={`aspect-square flex justify-center items-center cursor-pointer ${
          j % 2 === 0
            ? e % 2 === 0
              ? "bg-emerald-800"
              : "bg-stone-400"
            : e % 2 !== 0
            ? "bg-emerald-800 "
            : "bg-stone-400"
        } ${
          activePiece
            ? activePiece.legalMoves.some(
                (m) => m.x === squareData.x && m.y === squareData.y
              )
              ? "border-2 border-red-600"
              : ""
            : ""
        } `}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      ></div>
    );
  }
};

export default BoardSquare;
