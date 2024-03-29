import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkKing,
  removeLegalMovesFromKing,
  setLegalMoves,
  setKingCanCastle,
} from "../../features/board/boardSlice";
const Knight = ({
  piece,
  activePiece,
  x,
  y,
  onMouseDown,
  onMouseUp,
  mouseDragging,
}) => {
  const dispatch = useDispatch();
  const { board, whiteKingCalculated, blackKingCalculated } = useSelector(
    (state) => ({
      board: state.board.position,
      whiteKingCalculated: state.board.whiteKingCalculated,
      blackKingCalculated: state.board.blackKingCalculated,
    })
  );

  const calculateLegalMoves = () => {
    const legalMoves = [];
    const { x, y } = piece;

    const moves = [
      { x: x + 1, y: y + 2 },
      { x: x + 2, y: y + 1 },

      { x: x - 1, y: y - 2 },
      { x: x - 2, y: y - 1 },

      { x: x + 1, y: y - 2 },
      { x: x + 2, y: y - 1 },

      { x: x - 1, y: y + 2 },
      { x: x - 2, y: y + 1 },
    ];
    if (!piece.pinned) {
      moves.forEach((m) => {
        if (m.x >= 0 && m.x <= 7 && m.y >= 0 && m.y <= 7) {
          if (
            //for checking king
            board[m.x][m.y].piece !== null &&
            board[m.x][m.y].piece.type === 0 &&
            board[m.x][m.y].piece.white !== piece.white
          ) {
            dispatch(
              checkKing({
                piece: piece,
                squares: [{ x: piece.x, y: piece.y }],
                direction: -1,
              })
            );
          } else if (
            //for capturing opp piece
            board[m.x][m.y].piece !== null &&
            board[m.x][m.y].piece.white !== piece.white
          ) {
            legalMoves.push({ x: m.x, y: m.y });
          } else if (board[m.x][m.y].piece === null) {
            //for open square
            legalMoves.push({ x: m.x, y: m.y });
          } else if (
            //for protecting friendly piece
            board[m.x][m.y].piece !== null &&
            board[m.x][m.y].piece.white === piece.white
          ) {
            dispatch(
              removeLegalMovesFromKing({
                white: piece.white,
                moves: [{ x: m.x, y: m.y }],
              })
            );
          }
        }
      });
    }
    const castleRow = piece.white ? 0 : 7;
    for (const { x, y } of legalMoves) {
      if (x === castleRow) {
        if (y === 1 || y === 2) {
          dispatch(
            setKingCanCastle({
              white: !piece.white,
              canCastle: false,
              short: false,
            })
          );
        } else if (y === 5 || y === 6) {
          dispatch(
            setKingCanCastle({
              white: !piece.white,
              canCastle: false,
              short: true,
            })
          );
        }
      }
    }
    dispatch(setLegalMoves({ piece: piece, moves: legalMoves }));
    dispatch(
      removeLegalMovesFromKing({
        white: piece.white,
        moves: legalMoves,
      })
    );
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
      className={`select-none cursor-grabbing pointer-events-auto ${
        activePiece ? "z-auto " : "z-50"
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
                pointerEvents: "none",
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
          viewBox="0 0 157 156"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {piece.white ? (
            <g clip-path="url(#clip0_101_108)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M78.2 17.1001C127.55 21.8001 155.75 54.7001 153.4 153.4H45.3C45.3 111.1 92.3 122.85 82.9 54.7001"
                fill="white"
              />
              <path
                d="M78.2 17.1001C127.55 21.8001 155.75 54.7001 153.4 153.4H45.3C45.3 111.1 92.3 122.85 82.9 54.7001"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M87.6 54.7C89.386 68.377 61.515 89.339 50 97C35.9 106.4 36.746 117.398 26.5 115.8C21.6026 111.382 33.127 101.512 26.5 101.7C21.8 101.7 27.393 107.481 21.8 111.1C17.1 111.1 2.98591 115.8 3.00001 92.3C3.00001 82.9 31.2 35.9 31.2 35.9C31.2 35.9 40.083 26.97 40.6 19.45C37.169 14.7782 38.25 10.05 38.25 5.35C42.95 0.65 52.35 17.1 52.35 17.1H61.75C61.75 17.1 65.416 7.7376 73.5 3C78.2 3 78.2 17.1 78.2 17.1"
                fill="white"
              />
              <path
                d="M87.6 54.7C89.386 68.377 61.515 89.339 50 97C35.9 106.4 36.746 117.398 26.5 115.8C21.6026 111.382 33.127 101.512 26.5 101.7C21.8 101.7 27.393 107.481 21.8 111.1C17.1 111.1 2.98591 115.8 3.00001 92.3C3.00001 82.9 31.2 35.9 31.2 35.9C31.2 35.9 40.083 26.97 40.6 19.45C37.169 14.7782 38.25 10.05 38.25 5.35C42.95 0.65 52.35 17.1 52.35 17.1H61.75C61.75 17.1 65.416 7.7376 73.5 3C78.2 3 78.2 17.1 78.2 17.1"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.45 89.9501C19.45 90.5734 19.2024 91.1711 18.7617 91.6118C18.321 92.0525 17.7233 92.3001 17.1 92.3001C16.4767 92.3001 15.879 92.0525 15.4383 91.6118C14.9976 91.1711 14.75 90.5734 14.75 89.9501C14.75 89.3268 14.9976 88.7291 15.4383 88.2884C15.879 87.8477 16.4767 87.6001 17.1 87.6001C17.7233 87.6001 18.321 87.8477 18.7617 88.2884C19.2024 88.7291 19.45 89.3268 19.45 89.9501Z"
                fill="black"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M44.9851 44.125C44.0503 45.7442 42.9392 47.1733 41.8965 48.0979C40.8538 49.0225 39.9648 49.3669 39.425 49.0553C38.8853 48.7436 38.739 47.8015 39.0185 46.4362C39.2979 45.0709 39.9801 43.3942 40.9149 41.775C41.8498 40.1558 42.9608 38.7266 44.0036 37.802C45.0463 36.8774 45.9353 36.533 46.475 36.8447C47.0148 37.1563 47.161 38.0984 46.8816 39.4637C46.6022 40.8291 45.92 42.5058 44.9851 44.125V44.125Z"
                fill="black"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          ) : (
            <g clip-path="url(#clip0_101_104)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M78.2 17.1C127.55 21.8 155.75 54.7 153.4 153.4H45.3C45.3 111.1 92.3 122.85 82.9 54.7"
                fill="black"
              />
              <path
                d="M78.2 17.1C127.55 21.8 155.75 54.7 153.4 153.4H45.3C45.3 111.1 92.3 122.85 82.9 54.7"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M87.6 54.7C89.386 68.377 61.515 89.339 50 97C35.9 106.4 36.746 117.398 26.5 115.8C21.6026 111.382 33.127 101.512 26.5 101.7C21.8 101.7 27.393 107.481 21.8 111.1C17.1 111.1 2.98591 115.8 3.00001 92.3C3.00001 82.9 31.2 35.9 31.2 35.9C31.2 35.9 40.083 26.97 40.6 19.45C37.169 14.7782 38.25 10.05 38.25 5.35C42.95 0.65 52.35 17.1 52.35 17.1H61.75C61.75 17.1 65.416 7.7376 73.5 3C78.2 3 78.2 17.1 78.2 17.1"
                fill="black"
              />
              <path
                d="M87.6 54.7C89.386 68.377 61.515 89.339 50 97C35.9 106.4 36.746 117.398 26.5 115.8C21.6026 111.382 33.127 101.512 26.5 101.7C21.8 101.7 27.393 107.481 21.8 111.1C17.1 111.1 2.98591 115.8 3.00001 92.3C3.00001 82.9 31.2 35.9 31.2 35.9C31.2 35.9 40.083 26.97 40.6 19.45C37.169 14.7782 38.25 10.05 38.25 5.35C42.95 0.65 52.35 17.1 52.35 17.1H61.75C61.75 17.1 65.416 7.7376 73.5 3C78.2 3 78.2 17.1 78.2 17.1"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.45 89.95C19.45 90.5732 19.2024 91.171 18.7617 91.6117C18.321 92.0524 17.7233 92.3 17.1 92.3C16.4767 92.3 15.879 92.0524 15.4383 91.6117C14.9976 91.171 14.75 90.5732 14.75 89.95C14.75 89.3267 14.9976 88.729 15.4383 88.2883C15.879 87.8476 16.4767 87.6 17.1 87.6C17.7233 87.6 18.321 87.8476 18.7617 88.2883C19.2024 88.729 19.45 89.3267 19.45 89.95Z"
                fill="white"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M44.9851 44.125C44.0503 45.7442 42.9392 47.1733 41.8965 48.0979C40.8538 49.0225 39.9648 49.3669 39.425 49.0553C38.8853 48.7436 38.739 47.8015 39.0185 46.4362C39.2979 45.0709 39.9801 43.3942 40.9149 41.775C41.8498 40.1558 42.9608 38.7266 44.0036 37.802C45.0463 36.8774 45.9353 36.533 46.475 36.8447C47.0148 37.1563 47.161 38.0984 46.8816 39.4637C46.6022 40.8291 45.92 42.5058 44.9851 44.125V44.125Z"
                fill="white"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M90.1851 18.98L88.0701 25.795L90.4201 26.5C105.225 31.2 116.975 38.203 127.55 58.225C138.125 78.247 142.825 106.682 140.475 153.4L140.24 155.75H150.815L151.05 153.4C153.4 106.118 146.914 74.205 135.775 53.102C124.636 31.999 108.562 21.894 92.5821 19.45L90.1851 18.98Z"
                fill="white"
              />
            </g>
          )}
          <defs>
            <clipPath id="clip0_101_108">
              <rect width="157" height="156" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Knight;
