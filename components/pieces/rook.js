import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLegalMoves,
  checkKing,
  removeLegalMovesFromKing,
  setKingCanCastle,
} from "../../features/board/boardSlice";
const Rook = ({
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

    /*   0
           3 R 1
             2
        */

    /*
            0 1 2
            7 K 3
            6 5 4
        */

    for (let i = 0; i < 4; i++) {
      let x = 0;
      let y = 0;
      let checkedSquares = [];

      const files = [1, 3, 5, 7];

      if (piece.pinned) {
        if (files.includes(piece.pinDirection)) {
          if (i === 0 && piece.pinDirection === 1) {
            x = -1;
          } else if (i === 1 && piece.pinDirection === 3) {
            x = 1;
          } else if (i === 2 && piece.pinDirection === 5) {
            x = 1;
          } else if (i === 3 && piece.pinDirection === 7) {
            x = -1;
          } else {
            x = -100;
            y = -100;
          }
        } else {
          x = -101;
          y = -101;
        }
      } else {
        if (i === 0) {
          x = -1;
        }
        if (i === 1) {
          y = 1;
        }
        if (i === 2) {
          x = 1;
        }
        if (i === 3) {
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
              dispatch(
                removeLegalMovesFromKing({
                  white: piece.white,
                  moves: [{ x: coords.x, y: coords.y }],
                })
              );
              pieceHit = true;
            } else if (p.white !== piece.white) {
              if (p.type === 0) {
                var direction;
                if (i === 0) direction = 1;
                if (i === 1) direction = 3;
                if (i === 2) direction = 5;
                if (i === 3) direction = 7;
                dispatch(
                  checkKing({
                    piece: piece,
                    squares: [...checkedSquares, { x: piece.x, y: piece.y }],
                    direction: direction,
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
    //hacky
    if (piece.hasMoved) {
      if (piece.id === 18) {
        dispatch(
          setKingCanCastle({
            white: false,
            canCastle: false,
            short: false,
          })
        );
      } else if (piece.id === 11) {
        dispatch(
          setKingCanCastle({
            white: false,
            canCastle: false,
            short: true,
          })
        );
      } else if (piece.id === 1) {
        dispatch(
          setKingCanCastle({
            white: true,
            canCastle: false,
            short: false,
          })
        );
      } else if (piece.id === 8) {
        dispatch(
          setKingCanCastle({
            white: true,
            canCastle: false,
            short: true,
          })
        );
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
      className={`select-none cursor-grabbing ${
        activePiece ? "z-auto pointer-events-none" : "z-50"
      } w-[70%] h-[70%] mx-auto my-auto"`}
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
          viewBox='0 0 133 147'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          {piece.white ? (
            <g clip-path='url(#clip0_101_107)'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M3 144H129.9V129.9H3V144Z'
                fill='white'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M17.1001 129.9V111.1H115.8V129.9H17.1001Z'
                fill='white'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M12.3999 26.5V3H31.1999V12.4H54.6999V3H78.1999V12.4H101.7V3H120.5V26.5'
                fill='white'
              />
              <path
                d='M12.3999 26.5V3H31.1999V12.4H54.6999V3H78.1999V12.4H101.7V3H120.5V26.5'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M120.5 26.5L106.4 40.6H26.4999L12.3999 26.5'
                fill='white'
              />
              <path
                d='M120.5 26.5L106.4 40.6H26.4999L12.3999 26.5'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M106.4 40.6001V99.3501H26.5V40.6001'
                fill='white'
              />
              <path
                d='M106.4 40.6001V99.3501H26.5V40.6001'
                stroke='black'
                stroke-width='5'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M106.4 99.3501L113.45 111.1H19.4502L26.5002 99.3501'
                fill='white'
              />
              <path
                d='M106.4 99.3501L113.45 111.1H19.4502L26.5002 99.3501'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M12.3999 26.5H120.5'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
              />
            </g>
          ) : (
            <g clip-path='url(#clip0_101_105)'>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M3 144H129.9V129.9H3V144Z'
                fill='black'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M19.4502 111.1L26.5002 99.35H106.4L113.45 111.1H19.4502Z'
                fill='black'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M17.1001 129.9V111.1H115.8V129.9H17.1001Z'
                fill='black'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M26.5 99.35V38.25H106.4V99.35H26.5Z'
                fill='black'
                stroke='black'
                stroke-width='5'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M26.4999 38.25L12.3999 26.5H120.5L106.4 38.25H26.4999Z'
                fill='black'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M12.3999 26.5V3H31.1999V12.4H54.6999V3H78.1999V12.4H101.7V3H120.5V26.5H12.3999Z'
                fill='black'
                stroke='black'
                stroke-width='5'
                stroke-linejoin='round'
              />
              <path
                d='M17.1001 127.55H115.8'
                stroke='white'
                stroke-width='5'
                stroke-linecap='round'
              />
              <path
                d='M21.7998 108.75H111.1'
                stroke='white'
                stroke-width='5'
                stroke-linecap='round'
              />
              <path
                d='M26.5 99.35H106.4'
                stroke='white'
                stroke-width='5'
                stroke-linecap='round'
              />
              <path
                d='M26.5 38.25H106.4'
                stroke='white'
                stroke-width='5'
                stroke-linecap='round'
              />
              <path
                d='M12.3999 26.5H120.5'
                stroke='white'
                stroke-width='5'
                stroke-linecap='round'
              />
            </g>
          )}
          <defs>
            <clipPath id='clip0_101_107'>
              <rect width='133' height='147' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Rook;
