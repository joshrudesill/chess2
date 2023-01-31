import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLegalMoves,
  checkKing,
  removeLegalMovesFromKing,
  setKingCanCastle,
} from "../../features/board/boardSlice";
const Bishop = ({
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
    var legalMoves = [];

    /* 

           0   1
             B 
           3   2

        */

    for (let i = 0; i < 4; i++) {
      let x, y;
      const diagonals = [0, 2, 4, 6];
      let checkedSquares = [];

      if (piece.pinned) {
        if (diagonals.includes(piece.pinDirection)) {
          if (i === 0 && piece.pinDirection === 0) {
            x = -1;
            y = -1;
          } else if (i === 1 && piece.pinDirection === 2) {
            x = -1;
            y = 1;
          } else if (i === 2 && piece.pinDirection === 4) {
            x = 1;
            y = 1;
          } else if (i === 3 && piece.pinDirection === 6) {
            x = 1;
            y = -1;
          } else {
            x = -100;
            y = -100;
          }
        }
      } else {
        if (i === 0) {
          x = -1;
          y = -1;
        }
        if (i === 1) {
          x = -1;
          y = 1;
        }
        if (i === 2) {
          x = 1;
          y = 1;
        }
        if (i === 3) {
          x = 1;
          y = -1;
        }
      }

      let pieceHit = false;
      let j = 1;
      while (!pieceHit) {
        const coords = { x: j * x + piece.x, y: j * y + piece.y };

        if (coords.x >= 0 && coords.x <= 7 && coords.y >= 0 && coords.y <= 7) {
          const squareData = board[coords.x][coords.y];

          if (squareData.piece !== null) {
            const p = squareData.piece;

            if (p.white === piece.white) {
              //remove from king legal moves
              dispatch(
                removeLegalMovesFromKing({
                  white: piece.white,
                  moves: [{ x: coords.x, y: coords.y }],
                })
              );
              pieceHit = true;
            } else if (p.white !== piece.white) {
              if (p.type === 0) {
                dispatch(
                  checkKing({
                    piece: piece,
                    squares: [...checkedSquares, { x: piece.x, y: piece.y }],
                  })
                );
                pieceHit = true;
              } else {
                legalMoves.push({ x: coords.x, y: coords.y });
                pieceHit = true;
              }
            }
          } else if (squareData.piece === null) {
            checkedSquares.push({ x: coords.x, y: coords.y });
            legalMoves.push({ x: coords.x, y: coords.y });
          }
        } else {
          pieceHit = true;
          break;
        }

        j += 1;
      }
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
  //copy what was done here to other pieces
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
          viewBox='0 0 161 163'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          {piece.white ? (
            <g clip-path='url(#clip0_101_109)'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M17.1 146.35C33.033 141.791 64.617 148.371 80.55 136.95C96.483 148.371 128.067 141.791 144 146.35C144 146.35 151.755 148.888 158.1 155.75C154.904 160.309 150.345 160.403 144 158.1C128.067 153.541 96.483 160.262 80.55 153.4C64.617 160.262 33.033 153.541 17.1 158.1C10.7362 160.403 6.1819 160.309 3 155.75C9.3638 146.632 17.1 146.35 17.1 146.35Z'
                fill='white'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M45.3001 127.55C57.0501 139.3 104.05 139.3 115.8 127.55C118.15 120.5 115.8 118.15 115.8 118.15C115.8 106.4 104.05 99.35 104.05 99.35C129.9 92.3 132.25 45.3 80.5501 26.5C28.8501 45.3 31.2001 92.3 57.0501 99.35C57.0501 99.35 45.3001 106.4 45.3001 118.15C45.3001 118.15 42.9501 120.5 45.3001 127.55Z'
                fill='white'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M92.3 14.75C92.3 17.8663 91.0621 20.855 88.8586 23.0585C86.655 25.2621 83.6663 26.5 80.55 26.5C77.4338 26.5 74.4451 25.2621 72.2415 23.0585C70.038 20.855 68.8 17.8663 68.8 14.75C68.8 11.6337 70.038 8.64505 72.2415 6.4415C74.4451 4.23794 77.4338 3 80.55 3C83.6663 3 86.655 4.23794 88.8586 6.4415C91.0621 8.64505 92.3 11.6337 92.3 14.75V14.75Z'
                fill='white'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                d='M57.05 99.35H104.05M45.3 118.15H115.8M80.55 50V73.5M68.8 61.75H92.3'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
              />
            </g>
          ) : (
            <g clip-path='url(#clip0_101_103)'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M17.1 146.35C33.033 141.791 64.617 148.371 80.55 136.95C96.483 148.371 128.067 141.791 144 146.35C144 146.35 151.755 148.888 158.1 155.75C154.904 160.309 150.345 160.403 144 158.1C128.067 153.541 96.483 160.262 80.55 153.4C64.617 160.262 33.033 153.541 17.1 158.1C10.7362 160.403 6.1819 160.309 3 155.75C9.3638 146.632 17.1 146.35 17.1 146.35Z'
                fill='black'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M45.3001 127.55C57.0501 139.3 104.05 139.3 115.8 127.55C118.15 120.5 115.8 118.15 115.8 118.15C115.8 106.4 104.05 99.35 104.05 99.35C129.9 92.3 132.25 45.3 80.5501 26.5C28.8501 45.3 31.2001 92.3 57.0501 99.35C57.0501 99.35 45.3001 106.4 45.3001 118.15C45.3001 118.15 42.9501 120.5 45.3001 127.55Z'
                fill='black'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M92.3 14.75C92.3 17.8663 91.0621 20.855 88.8586 23.0585C86.655 25.2621 83.6663 26.5 80.55 26.5C77.4338 26.5 74.4451 25.2621 72.2415 23.0585C70.038 20.855 68.8 17.8663 68.8 14.75C68.8 11.6337 70.038 8.64505 72.2415 6.4415C74.4451 4.23794 77.4338 3 80.55 3C83.6663 3 86.655 4.23794 88.8586 6.4415C91.0621 8.64505 92.3 11.6337 92.3 14.75V14.75Z'
                fill='black'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                d='M57.05 99.35H104.05M45.3 118.15H115.8M80.55 50V73.5M68.8 61.75H92.3'
                stroke='white'
                stroke-width='5'
                stroke-linecap='round'
              />
            </g>
          )}
          <defs>
            <clipPath id='clip0_101_109'>
              <rect width='161' height='163' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Bishop;
