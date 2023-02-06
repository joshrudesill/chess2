import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLegalMoves,
  removeLegalMovesFromKing,
  checkKing,
  setKingCanCastle,
} from "../../features/board/boardSlice";
const Pawn = ({
  piece,
  activePiece,
  x,
  y,
  onMouseDown,
  onMouseUp,
  mouseDragging,
}) => {
  const dispatch = useDispatch();
  const { board, whiteKingCalculated, blackKingCalculated, enPassant } =
    useSelector((state) => ({
      board: state.board.position,
      whiteKingCalculated: state.board.whiteKingCalculated,
      blackKingCalculated: state.board.blackKingCalculated,
      enPassant: state.board.enPassant,
    }));

  const calculateLegalMoves = () => {
    var legalMoves = [];

    const xDirection = piece.white ? -1 : 1;

    const x = piece.x;
    const y = piece.y;

    if (x + xDirection <= 7 && x + xDirection >= 0) {
      //Basic moves

      if (board[piece.x + xDirection][piece.y].piece === null) {
        legalMoves.push({ x: piece.x + xDirection, y: piece.y });

        if (!piece.hasMoved) {
          if (board[piece.x + xDirection * 2][piece.y].piece === null) {
            legalMoves.push({ x: piece.x + xDirection * 2, y: piece.y });
          }
        }
      }

      if (y + 1 <= 7 || y - 1 >= 0) {
        //Capturing
        if (
          board[piece.x + xDirection][piece.y + 1]?.piece !== null &&
          board[piece.x + xDirection][piece.y + 1]?.piece.white !== piece.white
        ) {
          if (board[piece.x + xDirection][piece.y + 1]?.piece.type === 0) {
            dispatch(
              checkKing({
                piece: piece,
                squares: [{ x: piece.x, y: piece.y }],
              })
            );
          } else {
            if (
              (piece.white && piece.x + xDirection === 0) ||
              (!piece.white && piece.x + xDirection === 7)
            ) {
              const yCap = piece.y + 1;
              if (yCap === 5 || yCap === 6) {
                //
                dispatch(
                  setKingCanCastle({
                    white: !piece.white,
                    canCastle: false,
                    short: true,
                  })
                );
              }
              if (yCap === 2 || yCap === 3) {
                //
                dispatch(
                  setKingCanCastle({
                    white: !piece.white,
                    canCastle: false,
                    short: false,
                  })
                );
              }
            }
            legalMoves.push({ x: piece.x + xDirection, y: piece.y + 1 });
          }
        } else if (
          board[piece.x + xDirection][piece.y + 1]?.piece !== null &&
          board[piece.x + xDirection][piece.y + 1]?.piece.white === piece.white
        ) {
          //protect
          dispatch(
            removeLegalMovesFromKing({
              white: piece.white,
              moves: [{ x: piece.x + xDirection, y: piece.y + 1 }],
            })
          );
        }

        if (
          board[piece.x + xDirection][piece.y - 1]?.piece !== null &&
          board[piece.x + xDirection][piece.y - 1]?.piece.white !== piece.white
        ) {
          if (board[piece.x + xDirection][piece.y - 1]?.piece.type === 0) {
            dispatch(
              checkKing({
                piece: piece,
                squares: [{ x: piece.x, y: piece.y }],
              })
            );
          } else {
            if (
              (piece.white && piece.x + xDirection === 0) ||
              (!piece.white && piece.x + xDirection === 7)
            ) {
              const yCap = piece.y - 1;
              if (yCap === 5 || yCap === 6) {
                //
                dispatch(
                  setKingCanCastle({
                    white: !piece.white,
                    canCastle: false,
                    short: true,
                  })
                );
              }
              if (yCap === 2 || yCap === 3) {
                //
                dispatch(
                  setKingCanCastle({
                    white: !piece.white,
                    canCastle: false,
                    short: false,
                  })
                );
              }
            }
            legalMoves.push({ x: piece.x + xDirection, y: piece.y - 1 });
          }
        } else if (
          board[piece.x + xDirection][piece.y - 1]?.piece !== null &&
          board[piece.x + xDirection][piece.y - 1]?.piece.white === piece.white
        ) {
          //protect
          dispatch(
            removeLegalMovesFromKing({
              white: piece.white,
              moves: [{ x: piece.x + xDirection, y: piece.y - 1 }],
            })
          );
        }
      }

      //en passant
      if (
        (piece.x === 4 || piece.x === 3) &&
        enPassant.possible &&
        enPassant.white !== piece.white
      ) {
        console.log("cep");
        const x = enPassant.attackSquare[0];
        const y = enPassant.attackSquare[1];
        if (
          piece.x + xDirection === x &&
          (piece.y + 1 === y || piece.y - 1 === y)
        ) {
          legalMoves.push({ x: x, y: y });
        }
      }
      dispatch(setLegalMoves({ piece: piece, moves: legalMoves }));
    }
  };

  useEffect(() => {
    if (
      !piece.legalMovesUpdated &&
      whiteKingCalculated &&
      blackKingCalculated
    ) {
      calculateLegalMoves();
    }
  }, [piece.legalMovesUpdated, whiteKingCalculated, blackKingCalculated]);
  const boxRef = useRef(null);
  return (
    <div
      className={`select-none cursor-grabbing ${
        activePiece ? "z-auto pointer-events-none" : "z-50"
      } w-[80%] h-[80%] mx-auto my-auto"`}
      ref={boxRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div
        style={
          activePiece && activePiece.id === piece.id && mouseDragging
            ? {
                position: "fixed",
                left: "0",
                top: "0",
                width: `${boxRef.current?.clientWidth}`,
                height: `${boxRef.current?.clientHeight}`,
                transform: `translate(${
                  x - 0.5 * boxRef.current?.clientWidth
                }px, ${
                  y - 0.5 * boxRef.current?.clientHeight
                }px) translateZ(500px)`,
              }
            : {}
        }
      >
        <svg
          width={`${boxRef.current?.clientWidth}`}
          height={`${boxRef.current?.clientHeight}`}
          viewBox='0 0 114 149'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clip-path='url(#clip0_101_106)'>
            <path
              d='M57.05 3C46.663 3 38.25 11.413 38.25 21.8C38.25 25.983 39.613 29.837 41.916 32.986C32.751 38.25 26.5 48.073 26.5 59.4C26.5 68.941 30.918 77.448 37.827 83.041C23.727 88.023 3 109.126 3 146.35H111.1C111.1 109.126 90.373 88.023 76.273 83.041C83.182 77.448 87.6 68.941 87.6 59.4C87.6 48.073 81.349 38.25 72.184 32.986C74.487 29.837 75.85 25.983 75.85 21.8C75.85 11.413 67.437 3 57.05 3Z'
              fill={`${piece.white ? "white" : "black"}`}
              stroke='black'
              stroke-width='5'
              stroke-linecap='round'
            />
          </g>
          <defs>
            <clipPath id='clip0_101_106'>
              <rect width='114' height='149' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Pawn;
