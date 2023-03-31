import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLegalMoves,
  checkKing,
  removeLegalMovesFromKing,
  setKingCanCastle,
} from "../../features/board/boardSlice";
const Queen = ({
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

           

        */

    for (let i = 0; i < 4; i++) {
      let x, y;
      const diagonals = [0, 2, 4, 6];
      let checkedSquares = [];

      if (piece.pinned) {
        if (diagonals.includes(piece.pinDirection)) {
          if (
            i === 0 &&
            (piece.pinDirection === 0 || piece.pinDirection === 4)
          ) {
            x = -1;
            y = -1;
          } else if (
            i === 1 &&
            (piece.pinDirection === 2 || piece.pinDirection === 6)
          ) {
            x = -1;
            y = 1;
          } else if (
            i === 2 &&
            (piece.pinDirection === 0 || piece.pinDirection === 4)
          ) {
            x = 1;
            y = 1;
          } else if (
            i === 3 &&
            (piece.pinDirection === 2 || piece.pinDirection === 6)
          ) {
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

      var pieceHit = false;
      var j = 1;
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
                if (i === 0) direction = 0;
                if (i === 1) direction = 2;
                if (i === 2) direction = 4;
                if (i === 3) direction = 6;
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

    for (let i = 0; i < 4; i++) {
      let x = 0;
      let y = 0;

      const files = [1, 3, 5, 7];
      let checkedSquares = [];

      if (piece.pinned) {
        if (files.includes(piece.pinDirection)) {
          if (
            i === 0 &&
            (piece.pinDirection === 1 || piece.pinDirection === 5)
          ) {
            x = -1;
          } else if (
            i === 1 &&
            (piece.pinDirection === 3 || piece.pinDirection === 7)
          ) {
            y = 1;
          } else if (
            i === 2 &&
            (piece.pinDirection === 1 || piece.pinDirection === 5)
          ) {
            x = 1;
          } else if (
            i === 3 &&
            (piece.pinDirection === 3 || piece.pinDirection === 7)
          ) {
            y = -1;
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
        //console.log('calc: ' , piece.id)
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
                //remove xray moves
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

        j = j + 1;
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
          viewBox="0 0 180 165"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {piece.white ? (
            <g clip-path="url(#clip0_101_110)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.8 33.5499C21.8 36.0429 20.8096 38.4339 19.0468 40.1967C17.284 41.9595 14.893 42.9499 12.4 42.9499C9.90696 42.9499 7.51604 41.9595 5.7532 40.1967C3.99035 38.4339 3 36.0429 3 33.5499C3 31.0569 3.99035 28.6659 5.7532 26.9031C7.51604 25.1403 9.90696 24.1499 12.4 24.1499C14.893 24.1499 17.284 25.1403 19.0468 26.9031C20.8096 28.6659 21.8 31.0569 21.8 33.5499V33.5499Z"
                fill="white"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M99.35 12.4C99.35 14.893 98.3597 17.284 96.5969 19.0468C94.834 20.8096 92.4431 21.8 89.95 21.8C87.457 21.8 85.0661 20.8096 83.3032 19.0468C81.5404 17.284 80.55 14.893 80.55 12.4C80.55 9.90696 81.5404 7.51604 83.3032 5.7532C85.0661 3.99036 87.457 3 89.95 3C92.4431 3 94.834 3.99036 96.5969 5.7532C98.3597 7.51604 99.35 9.90696 99.35 12.4V12.4Z"
                fill="white"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M176.9 33.5499C176.9 36.0429 175.91 38.4339 174.147 40.1967C172.384 41.9595 169.993 42.9499 167.5 42.9499C165.007 42.9499 162.616 41.9595 160.853 40.1967C159.09 38.4339 158.1 36.0429 158.1 33.5499C158.1 31.0569 159.09 28.6659 160.853 26.9031C162.616 25.1403 165.007 24.1499 167.5 24.1499C169.993 24.1499 172.384 25.1403 174.147 26.9031C175.91 28.6659 176.9 31.0569 176.9 33.5499V33.5499Z"
                fill="white"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M59.4001 17.1C59.4001 19.593 58.4097 21.9839 56.6469 23.7468C54.8841 25.5096 52.4931 26.5 50.0001 26.5C47.5071 26.5 45.1161 25.5096 43.3533 23.7468C41.5905 21.9839 40.6001 19.593 40.6001 17.1C40.6001 14.6069 41.5905 12.216 43.3533 10.4531C45.1161 8.69031 47.5071 7.69995 50.0001 7.69995C52.4931 7.69995 54.8841 8.69031 56.6469 10.4531C58.4097 12.216 59.4001 14.6069 59.4001 17.1V17.1Z"
                fill="white"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M139.3 19.45C139.3 21.9431 138.31 24.334 136.547 26.0969C134.784 27.8597 132.393 28.85 129.9 28.85C127.407 28.85 125.016 27.8597 123.253 26.0969C121.49 24.334 120.5 21.9431 120.5 19.45C120.5 16.957 121.49 14.5661 123.253 12.8032C125.016 11.0404 127.407 10.05 129.9 10.05C132.393 10.05 134.784 11.0404 136.547 12.8032C138.31 14.5661 139.3 16.957 139.3 19.45V19.45Z"
                fill="white"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M26.5001 99.3501C66.4501 92.3001 125.2 92.3001 153.4 99.3501L162.8 42.9501L129.9 94.6501V28.85L104.05 92.3001L89.9501 21.8L75.8501 92.3001L50.0001 26.5V94.6501L17.1001 42.9501L26.5001 99.3501Z"
                fill="white"
                stroke="black"
                stroke-width="5"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M26.5 99.35C26.5 108.75 33.55 108.75 38.25 118.15C42.95 125.2 42.95 122.85 40.6 134.6C33.55 139.3 33.55 146.35 33.55 146.35C26.5 153.4 35.9 158.1 35.9 158.1C66.45 162.8 113.45 162.8 144 158.1C144 158.1 151.05 153.4 144 146.35C144 146.35 146.35 139.3 139.3 134.6C136.95 122.85 136.95 125.2 141.65 118.15C146.35 108.75 153.4 108.75 153.4 99.35C113.45 92.3 66.45 92.3 26.5 99.35Z"
                fill="white"
                stroke="black"
                stroke-width="5"
                stroke-linejoin="round"
              />
              <path
                d="M38.25 118.15C54.7 113.45 125.2 113.45 141.65 118.15"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M40.6001 134.6C68.8001 129.9 111.1 129.9 139.3 134.6"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          ) : (
            <g clip-path="url(#clip0_101_102)">
              <path
                d="M12.925 44.6501C20.0633 44.6501 25.85 38.8633 25.85 31.725C25.85 24.5868 20.0633 18.8 12.925 18.8C5.78672 18.8 0 24.5868 0 31.725C0 38.8633 5.78672 44.6501 12.925 44.6501Z"
                fill="black"
              />
              <path
                d="M50.5251 30.55C57.6634 30.55 63.4501 24.7632 63.4501 17.625C63.4501 10.4867 57.6634 4.69995 50.5251 4.69995C43.3868 4.69995 37.6001 10.4867 37.6001 17.625C37.6001 24.7632 43.3868 30.55 50.5251 30.55Z"
                fill="black"
              />
              <path
                d="M90.475 25.85C97.6133 25.85 103.4 20.0633 103.4 12.925C103.4 5.78672 97.6133 0 90.475 0C83.3368 0 77.55 5.78672 77.55 12.925C77.55 20.0633 83.3368 25.85 90.475 25.85Z"
                fill="black"
              />
              <path
                d="M130.425 30.55C137.563 30.55 143.35 24.7632 143.35 17.625C143.35 10.4867 137.563 4.69995 130.425 4.69995C123.287 4.69995 117.5 10.4867 117.5 17.625C117.5 24.7632 123.287 30.55 130.425 30.55Z"
                fill="black"
              />
              <path
                d="M168.025 44.6501C175.163 44.6501 180.95 38.8633 180.95 31.725C180.95 24.5868 175.163 18.8 168.025 18.8C160.887 18.8 155.1 24.5868 155.1 31.725C155.1 38.8633 160.887 44.6501 168.025 44.6501Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M27.0249 97.5249C66.9749 90.4749 125.725 90.4749 153.925 97.5249L165.675 38.775L130.425 92.8249L129.015 26.5549L104.575 90.4749L90.4749 22.325L76.3749 90.4749L51.9349 26.5549L50.5249 92.8249L15.2749 38.775L27.0249 97.5249Z"
                fill="black"
                stroke="black"
                stroke-width="5"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M27.0249 97.525C27.0249 106.925 34.0749 106.925 38.7749 116.325C43.4749 123.375 43.4749 121.025 41.1249 132.775C34.0749 137.475 34.0749 144.525 34.0749 144.525C27.0249 151.575 36.4249 156.275 36.4249 156.275C66.9749 160.975 113.975 160.975 144.525 156.275C144.525 156.275 151.575 151.575 144.525 144.525C144.525 144.525 146.875 137.475 139.825 132.775C137.475 121.025 137.475 123.375 142.175 116.325C146.875 106.925 153.925 106.925 153.925 97.525C113.975 90.475 66.9749 90.475 27.0249 97.525Z"
                fill="black"
                stroke="black"
                stroke-width="5"
                stroke-linejoin="round"
              />
              <path
                d="M36.425 156.275C71.4295 168.453 109.521 168.453 144.525 156.275"
                stroke="black"
                stroke-width="5"
                stroke-linejoin="round"
              />
              <path
                d="M36.425 111.625C71.4295 99.4474 109.521 99.4474 144.525 111.625"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M43.4751 123.375H137.475"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M38.7749 137.475C72.3456 148.589 108.604 148.589 142.175 137.475"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34.075 151.575C70.4998 164.869 110.45 164.869 146.875 151.575"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          )}
          <defs>
            <clipPath id="clip0_101_110">
              <rect width="180" height="165" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Queen;
