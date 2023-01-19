import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLegalMoves,
  checkKing,
  removeLegalMovesFromKing,
} from "../../features/board/boardSlice";
import Image from "next/image";
const white = require("../../assets/whitebishop.svg");
const black = require("../../assets/blackbishop.svg");
const Bishop = ({ piece }) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.position);
  const whiteKingCalculated = useSelector(
    (state) => state.board.whiteKingCalculated
  );
  const blackKingCalculated = useSelector(
    (state) => state.board.blackKingCalculated
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

  return (
    <div className='pointer-events-none select-none z-10'>
      <Image
        src={piece.white ? white : black}
        alt='king'
        layout='intrinsic'
        height={120}
        draggable='false'
        unselectable='true'
      ></Image>
    </div>
  );
};

export default Bishop;
