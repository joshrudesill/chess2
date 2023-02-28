import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pinPiece,
  setLegalMoves,
  setKingCalculated,
  recheckLegalMoves,
  changeKingLocation,
  setKingCanCastle,
} from "../../features/board/boardSlice";
const King = ({
  piece,
  activePiece,
  x,
  y,
  onMouseDown,
  onMouseUp,
  mouseDragging,
}) => {
  const dispatch = useDispatch();
  const { board, kingData } = useSelector((state) => ({
    board: state.board.position,
    kingData: state.board.kingData,
  }));
  useEffect(() => {
    dispatch(
      changeKingLocation({
        white: piece.white,
        position: { x: piece.x, y: piece.y },
      })
    );
  }, [piece.x, piece.y]);

  const calculateLegalMoves = () => {
    var legalMoves = [];

    // shoot 8 rays in every direction
    // if piece is friendly save it
    // if next piece is piece attacking that piece pin set pinned to true
    // if piece can move in that direction to take the pinned piece then set legalMoves and updatedLegalMoves
    /*
            0 1 2
            7 K 3
            6 5 4
        */

    for (let i = 0; i < 8; i++) {
      var x, y;
      if (i === 0) {
        x = -1;
        y = -1;
      }

      if (i === 1) {
        x = -1;
        y = 0;
      }

      if (i === 2) {
        x = -1;
        y = 1;
      }

      if (i === 3) {
        x = 0;
        y = 1;
      }

      if (i === 4) {
        x = 1;
        y = 1;
      }

      if (i === 5) {
        x = 1;
        y = 0;
      }

      if (i === 6) {
        x = 1;
        y = -1;
      }

      if (i === 7) {
        x = 0;
        y = -1;
      }
      if (
        x + piece.x >= 0 &&
        x + piece.x <= 7 &&
        y + piece.y >= 0 &&
        y + piece.y <= 7
      ) {
        if (board[x + piece.x][y + piece.y].piece !== null) {
          if (board[x + piece.x][y + piece.y].piece.white !== piece.white) {
            legalMoves.push({ x: x + piece.x, y: y + piece.y });
          }
        } else {
          legalMoves.push({ x: x + piece.x, y: y + piece.y });
        }
      }
      var friendlyHit = false;
      var endLoop = false;
      var friendlyPiece = false;
      var j = 1;

      while (!endLoop) {
        const coords = { x: j * x + piece.x, y: j * y + piece.y };
        //console.log(`Loop: ${j} FH: ${friendlyHit} Coords: ${coords.x}, ${coords.y} FP: ${friendlyPiece}`)

        if (coords.x >= 0 && coords.x <= 7 && coords.y >= 0 && coords.y <= 7) {
          const squareData = board[coords.x][coords.y];

          if (squareData.piece !== null) {
            const p = squareData.piece;

            if (friendlyHit) {
              if (p.white !== piece.white) {
                //console.log(`enemy hit at: [${p.x} , ${p.y}]`)

                //check piece type and pin accordingly

                const diagonals = [0, 2, 4, 6];
                const files = [1, 3, 5, 7];

                if (diagonals.includes(i)) {
                  if (p.type === 5 || p.type === 3) {
                    dispatch(pinPiece({ piece: friendlyPiece, direction: i }));
                  }
                }
                if (files.includes(i)) {
                  if (p.type === 5 || p.type === 2) {
                    dispatch(pinPiece({ piece: friendlyPiece, direction: i }));
                  }
                }

                endLoop = true;
              } else {
                endLoop = true;
                break;
              }
            } else if (p.white === piece.white && !friendlyHit) {
              //console.log(`friendly hit at: [${p.x} , ${p.y}]`)
              friendlyPiece = squareData.piece;
              friendlyHit = true;
            } else if (p.white === piece.white && friendlyHit) {
              endLoop = true;
              break;
            }
          }
        } else {
          friendlyHit = true;
          endLoop = true;
          break;
        }

        j++;
      }
    }
    if (piece.hasMoved) {
      dispatch(
        setKingCanCastle({ white: piece.white, canCastle: false, short: false })
      );
      dispatch(
        setKingCanCastle({ white: piece.white, canCastle: false, short: true })
      );
    } else {
      if (
        board[piece.x][piece.y - 1].piece !== null ||
        board[piece.x][piece.y - 2].piece !== null
      ) {
        // cant castle
        dispatch(
          setKingCanCastle({
            white: piece.white,
            canCastle: false,
            short: false,
          })
        );
      }
      if (
        board[piece.x][piece.y + 1].piece !== null ||
        board[piece.x][piece.y + 2].piece !== null
      ) {
        // cant castle
        dispatch(
          setKingCanCastle({
            white: piece.white,
            canCastle: false,
            short: true,
          })
        );
      }
    }
    dispatch(setLegalMoves({ piece: piece, moves: legalMoves }));
    dispatch(setKingCalculated(piece.white));
  };

  useEffect(() => {
    if (!piece.legalMovesUpdated) {
      calculateLegalMoves();
    }
  }, [piece.legalMovesUpdated]);

  useEffect(() => {
    if (kingData.inCheck && kingData.white == piece.white) {
      dispatch(recheckLegalMoves());
    }
  }, [kingData.inCheck, kingData.white]);
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
                background: "red",
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
          viewBox='0 0 162 164'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          {piece.white ? (
            <g clip-path='url(#clip0_101_111)'>
              <path
                d='M81.3638 29.461V3'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
              />
              <path
                d='M69.6138 12.3999H93.1138'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M81.3637 92.2999C81.3637 92.2999 102.514 57.05 95.4637 42.95C95.4637 42.95 90.7637 31.2 81.3637 31.2C71.9637 31.2 67.2637 42.95 67.2637 42.95C60.2137 57.05 81.3637 92.2999 81.3637 92.2999Z'
                fill='white'
                stroke='black'
                stroke-width='5'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M29.6637 148.7C55.5137 165.15 102.514 165.15 128.364 148.7V115.8C128.364 115.8 170.664 94.6499 156.564 66.4499C137.764 35.8999 93.1137 49.9999 81.3637 85.2499V101.7V85.2499C64.9137 49.9999 20.2637 35.8999 6.16371 66.4499C-7.93629 94.6499 29.6637 113.45 29.6637 113.45V148.7Z'
                fill='white'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M29.6638 115.8C55.5138 101.7 102.514 101.7 128.364 115.8'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M29.6638 132.25C55.5138 118.15 102.514 118.15 128.364 132.25'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M29.6638 148.7C55.5138 134.6 102.514 134.6 128.364 148.7'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </g>
          ) : (
            <g clip-path='url(#clip0_101_101)'>
              <path
                d='M81.3638 29.461V3'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M81.3637 92.2999C81.3637 92.2999 102.514 57.05 95.4637 42.95C95.4637 42.95 90.7637 31.2 81.3637 31.2C71.9637 31.2 67.2637 42.95 67.2637 42.95C60.2137 57.05 81.3637 92.2999 81.3637 92.2999Z'
                fill='black'
                stroke='black'
                stroke-width='5'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M29.6637 148.7C55.5137 165.15 102.514 165.15 128.364 148.7V115.8C128.364 115.8 170.664 94.65 156.564 66.45C137.764 35.9 93.1137 50 81.3637 85.25V101.7V85.25C64.9137 50 20.2637 35.9 6.16371 66.45C-7.93629 94.65 29.6637 113.45 29.6637 113.45V148.7Z'
                fill='black'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M69.6138 12.4H93.1138'
                stroke='black'
                stroke-width='5'
                stroke-linecap='round'
              />
              <path
                d='M126.014 113.45C126.014 113.45 165.964 94.65 154.355 68.095C136.119 40.6 93.1136 59.4 81.3636 89.95L81.4106 99.82L81.3636 89.95C69.6136 59.4 22.1718 40.6 8.4995 68.095C-3.2364 94.65 31.3086 110.395 31.3086 110.395'
                stroke='white'
                stroke-width='5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M29.6638 115.8C55.5138 101.7 102.514 101.7 128.364 115.8M29.6638 132.25C55.5138 118.15 102.514 118.15 128.364 132.25M29.6638 148.7C55.5138 134.6 102.514 134.6 128.364 148.7'
                stroke='white'
                stroke-width='5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </g>
          )}
          <defs>
            <clipPath id='clip0_101_111'>
              <rect width='162' height='164' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default King;
