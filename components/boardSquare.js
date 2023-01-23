import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePieceAtSquare,
  setActivePiece,
  capturePiece,
  resetPieceState,
  setFirstMove,
  resetActivePiece,
  setMouseDragging,
} from "../features/board/boardSlice";
import Bishop from "./pieces/bishop";
import King from "./pieces/king";
import Knight from "./pieces/knight";
import Pawn from "./pieces/pawn";
import Queen from "./pieces/queen";
import Rook from "./pieces/rook";

const BoardSquare = ({
  squareData,
  j,
  e,
  x,
  y,
  activePiece,
  myTurn,
  mouseDragging,
}) => {
  const dispatch = useDispatch();
  const onMouseDown = () => {
    if (myTurn) {
      if (activePiece === null && squareData.piece !== null) {
        dispatch(setMouseDragging(true));
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
          dispatch(setMouseDragging(false));
          dispatch(resetPieceState());
        } else {
          dispatch(resetActivePiece());
        }
      } else if (
        activePiece &&
        squareData.piece &&
        activePiece.white === squareData.piece.white
      ) {
        dispatch(resetActivePiece());
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
          dispatch(setMouseDragging(false));
          dispatch(resetPieceState());
        } else {
          dispatch(resetActivePiece());
        }
      }
    }
  };

  const onMouseUp = () => {
    if (myTurn) {
      console.log("mouse up");
      dispatch(setMouseDragging(false));
      if (
        activePiece !== null &&
        squareData.piece !== null &&
        activePiece.x === squareData.piece.x &&
        activePiece.y === squareData.piece.y
      ) {
        dispatch(resetActivePiece());
        dispatch(setActivePiece(squareData.piece));
      } else {
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
          } else {
            dispatch(resetActivePiece());
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
            console.log("capturing");
            dispatch(capturePiece({ toBeCaptured: squareData.piece }));
            dispatch(resetPieceState());
          } else {
            console.log("not capturing");
            dispatch(resetActivePiece());
          }
        } else {
          console.log("else");
          dispatch(resetActivePiece());
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
  const boxRef = useRef(null);
  if (squareData.piece !== null && squareData.piece.type === 2) {
    return (
      <div
        ref={boxRef}
        className={`aspect-square flex justify-center items-center   cursor-grab z-auto ${
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
        {activePiece ? (
          activePiece.legalMoves.some(
            (m) => m.x === squareData.x && m.y === squareData.y
          ) ? (
            <div
              className='opacity-50 rounded-full absolute z-50 border-8 border-black'
              style={{
                height: `${boxRef.current?.clientHeight * 0.95}px`,
                width: `${boxRef.current?.clientHeight * 0.95}px`,
                border: `${boxRef.current?.clientHeight * 0.1}px solid black`,
              }}
            ></div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <Rook
          piece={squareData.piece}
          activePiece={activePiece}
          x={x}
          y={y}
          mouseDragging={mouseDragging}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </div>
    );
  }
  if (squareData.piece !== null && squareData.piece.type === 1) {
    return (
      <div
        ref={boxRef}
        className={`aspect-square flex justify-center items-center cursor-grab z-auto ${
          j % 2 === 0
            ? e % 2 === 0
              ? "bg-emerald-800"
              : "bg-stone-400"
            : e % 2 !== 0
            ? "bg-emerald-800 "
            : "bg-stone-400"
        }  `}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {activePiece ? (
          activePiece.legalMoves.some(
            (m) => m.x === squareData.x && m.y === squareData.y
          ) ? (
            <div
              className='opacity-50 rounded-full absolute z-50 border-8 border-black'
              style={{
                height: `${boxRef.current?.clientHeight * 0.95}px`,
                width: `${boxRef.current?.clientHeight * 0.95}px`,
                border: `${boxRef.current?.clientHeight * 0.1}px solid black`,
              }}
            ></div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <Pawn
          piece={squareData.piece}
          activePiece={activePiece}
          x={x}
          y={y}
          mouseDragging={mouseDragging}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </div>
    );
  }
  if (squareData.piece !== null && squareData.piece.type === 0) {
    return (
      <div
        ref={boxRef}
        className={`aspect-square flex justify-center items-center cursor-grab z-auto ${
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
        {activePiece ? (
          activePiece.legalMoves.some(
            (m) => m.x === squareData.x && m.y === squareData.y
          ) ? (
            <div
              className='opacity-50 rounded-full absolute z-50 border-8 border-black'
              style={{
                height: `${boxRef.current?.clientHeight * 0.95}px`,
                width: `${boxRef.current?.clientHeight * 0.95}px`,
                border: `${boxRef.current?.clientHeight * 0.1}px solid black`,
              }}
            ></div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <King
          piece={squareData.piece}
          activePiece={activePiece}
          x={x}
          y={y}
          mouseDragging={mouseDragging}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </div>
    );
  }
  if (squareData.piece !== null && squareData.piece.type === 3) {
    return (
      <div
        ref={boxRef}
        className={`aspect-square flex justify-center items-center cursor-grab z-auto ${
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
        {" "}
        {activePiece ? (
          activePiece.legalMoves.some(
            (m) => m.x === squareData.x && m.y === squareData.y
          ) ? (
            <div
              className='opacity-50 rounded-full absolute z-50 border-8 border-black'
              style={{
                height: `${boxRef.current?.clientHeight * 0.95}px`,
                width: `${boxRef.current?.clientHeight * 0.95}px`,
                border: `${boxRef.current?.clientHeight * 0.1}px solid black`,
              }}
            ></div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <Bishop
          piece={squareData.piece}
          activePiece={activePiece}
          x={x}
          y={y}
          mouseDragging={mouseDragging}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </div>
    );
  }
  if (squareData.piece !== null && squareData.piece.type === 4) {
    return (
      <div
        ref={boxRef}
        className={`aspect-square flex justify-center items-center      cursor-grab z-auto ${
          j % 2 === 0
            ? e % 2 === 0
              ? "bg-emerald-800"
              : "bg-stone-400"
            : e % 2 !== 0
            ? "bg-emerald-800 "
            : "bg-stone-400"
        }  `}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {activePiece ? (
          activePiece.legalMoves.some(
            (m) => m.x === squareData.x && m.y === squareData.y
          ) ? (
            <div
              className='opacity-50 rounded-full absolute z-50 border-8 border-black'
              style={{
                height: `${boxRef.current?.clientHeight * 0.95}px`,
                width: `${boxRef.current?.clientHeight * 0.95}px`,
                border: `${boxRef.current?.clientHeight * 0.1}px solid black`,
              }}
            ></div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <Knight
          piece={squareData.piece}
          activePiece={activePiece}
          x={x}
          y={y}
          mouseDragging={mouseDragging}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </div>
    );
  }
  if (squareData.piece !== null && squareData.piece.type === 5) {
    return (
      <div
        ref={boxRef}
        className={`aspect-square flex justify-center items-center cursor-grab z-auto ${
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
        {activePiece ? (
          activePiece.legalMoves.some(
            (m) => m.x === squareData.x && m.y === squareData.y
          ) ? (
            <div
              className='opacity-50 rounded-full absolute z-50 border-8 border-black'
              style={{
                height: `${boxRef.current?.clientHeight * 0.95}px`,
                width: `${boxRef.current?.clientHeight * 0.95}px`,
                border: `${boxRef.current?.clientHeight * 0.1}px solid black`,
              }}
            ></div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <Queen
          piece={squareData.piece}
          activePiece={activePiece}
          x={x}
          y={y}
          mouseDragging={mouseDragging}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </div>
    );
  }
  if (squareData.piece === null) {
    return (
      <div
        className={`aspect-square flex justify-center items-center cursor-grab z-auto ${
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
              ? "bg-red-600"
              : ""
            : ""
        } `}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {activePiece ? (
          activePiece.legalMoves.some(
            (m) => m.x === squareData.x && m.y === squareData.y
          ) ? (
            <div className='h-[40%] w-[40%] bg-zinc-900 opacity-50 rounded-full '></div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    );
  }
};

export default BoardSquare;
