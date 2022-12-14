import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLegalMoves,
  checkKing,
  removeLegalMovesFromKing,
} from "../../features/board/boardSlice";
import Image from "next/image";
const white = require("../../assets/whiterook.svg");
const black = require("../../assets/blackrook.svg");
const Rook = ({ piece }) => {
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
    <div>
      <Image
        src={piece.white ? white : black}
        alt='king'
        layout='intrinsic'
        height={100}
      ></Image>
    </div>
  );
};

export default Rook;
