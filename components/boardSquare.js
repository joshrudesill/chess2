import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useSound from "use-sound";
import {
  changePieceAtSquare,
  setActivePiece,
  capturePiece,
  resetPieceState,
  resetActivePiece,
  setMouseDragging,
  castleKing,
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
  lastMove,
  mouseDragging,
  myTurn,
  play,
  whiteKingCanCastle,
  blackKingCanCastle,
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
          if (activePiece.type === 0) {
            //check for king then for castle move
            if (activePiece.white) {
              if (whiteKingCanCastle[0] || whiteKingCanCastle[1]) {
                if (whiteKingCanCastle[0] && x === 7 && y === 2) {
                  //castle
                } else if (whiteKingCanCastle[1] && x === 7 && y === 6) {
                  //castle
                }
              } else {
                dispatch(changePieceAtSquare(squareData));
                dispatch(setMouseDragging(false));
                dispatch(resetPieceState());
              }
            } else {
              if (blackKingCanCastle[0] || blackKingCanCastle[1]) {
                if (blackKingCanCastle[0] && x === 7 && y === 2) {
                  //castle
                } else if (blackKingCanCastle[1] && x === 7 && y === 6) {
                  //castle
                }
              } else {
                dispatch(changePieceAtSquare(squareData));
                dispatch(setMouseDragging(false));
                dispatch(resetPieceState());
              }
            }
          } else {
            dispatch(changePieceAtSquare(squareData));
            dispatch(setMouseDragging(false));
            dispatch(resetPieceState());
          }
          play();
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
          play();
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
            if (activePiece.type === 0) {
              //check for king then for castle move
              if (activePiece.white) {
                if (whiteKingCanCastle[0] || whiteKingCanCastle[1]) {
                  if (whiteKingCanCastle[0] && x === 7 && y === 2) {
                    //castle
                    dispatch(castleKing({ white: true, short: false }));
                  } else if (whiteKingCanCastle[1] && x === 7 && y === 6) {
                    //castle
                    dispatch(castleKing({ white: true, short: false }));
                  }
                } else {
                  dispatch(changePieceAtSquare(squareData));
                  dispatch(setMouseDragging(false));
                  dispatch(resetPieceState());
                }
              } else {
                if (blackKingCanCastle[0] || blackKingCanCastle[1]) {
                  if (blackKingCanCastle[0] && x === 7 && y === 2) {
                    //castle
                    dispatch(castleKing({ white: false, short: false }));
                  } else if (blackKingCanCastle[1] && x === 7 && y === 6) {
                    //castle
                    dispatch(castleKing({ white: false, short: false }));
                  }
                } else {
                  dispatch(changePieceAtSquare(squareData));
                  dispatch(setMouseDragging(false));
                  dispatch(resetPieceState());
                }
              }
            } else {
              dispatch(changePieceAtSquare(squareData));
              dispatch(setMouseDragging(false));
              dispatch(resetPieceState());
            }
            play();
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
            play();
            dispatch(capturePiece({ toBeCaptured: squareData.piece }));
            dispatch(resetPieceState());
          } else {
            dispatch(resetActivePiece());
          }
        } else {
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
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    if (
      lastMove &&
      lastMove[0] === squareData.x &&
      lastMove[1] === squareData.y
    ) {
      setHighlighted(true);
    } else if (
      lastMove &&
      lastMove[2] === squareData.x &&
      lastMove[3] === squareData.y
    ) {
      setHighlighted(true);
    } else {
      setHighlighted(false);
    }
  }, [...lastMove]);
  const boxRef = useRef(null);
  if (squareData.piece !== null) {
    return (
      <div
        ref={boxRef}
        className={`aspect-square flex justify-center items-center cursor-grab z-auto ${
          j % 2 === 0
            ? e % 2 === 0
              ? `${highlighted ? "bg-amber-300" : "bg-stone-400"}`
              : `${highlighted ? "bg-amber-400" : "bg-emerald-800"}`
            : e % 2 !== 0
            ? `${highlighted ? "bg-amber-300" : "bg-stone-400"}`
            : `${highlighted ? "bg-amber-400" : "bg-emerald-800"}`
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
        {squareData.piece.type === 0 ? (
          <King
            piece={squareData.piece}
            activePiece={activePiece}
            x={x}
            y={y}
            mouseDragging={mouseDragging}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
        ) : squareData.piece.type === 1 ? (
          <Pawn
            piece={squareData.piece}
            activePiece={activePiece}
            x={x}
            y={y}
            mouseDragging={mouseDragging}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
        ) : squareData.piece.type === 2 ? (
          <Rook
            piece={squareData.piece}
            activePiece={activePiece}
            x={x}
            y={y}
            mouseDragging={mouseDragging}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
        ) : squareData.piece.type === 3 ? (
          <Bishop
            piece={squareData.piece}
            activePiece={activePiece}
            x={x}
            y={y}
            mouseDragging={mouseDragging}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
        ) : squareData.piece.type === 4 ? (
          <Knight
            piece={squareData.piece}
            activePiece={activePiece}
            x={x}
            y={y}
            mouseDragging={mouseDragging}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
        ) : squareData.piece.type === 5 ? (
          <Queen
            piece={squareData.piece}
            activePiece={activePiece}
            x={x}
            y={y}
            mouseDragging={mouseDragging}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }

  return (
    <div
      className={`aspect-square flex justify-center items-center cursor-grab z-auto ${
        j % 2 === 0
          ? e % 2 === 0
            ? `${highlighted ? "bg-amber-300" : "bg-stone-400"}`
            : `${highlighted ? "bg-amber-400" : "bg-emerald-800"}`
          : e % 2 !== 0
          ? `${highlighted ? "bg-amber-300" : "bg-stone-400"}`
          : `${highlighted ? "bg-amber-400" : "bg-emerald-800"}`
      }`}
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
};

export default BoardSquare;
