import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pinPiece,
  setLegalMoves,
  setKingCalculated,
  recheckLegalMoves,
  changeKingLocation,
} from "../../features/board/boardSlice";
import Image from "next/image";
const white = require("../../assets/whiteking.svg");
const black = require("../../assets/blackking.svg");
const King = ({ piece }) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.position);
  const kingData = useSelector((state) => state.board.kingData);
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

  return (
    <div className='pointer-events-none select-none z-10'>
      <Image
        src={piece.white ? white : black}
        alt='king'
        layout='intrinsic'
        height={130}
        draggable='false'
        unselectable='true'
      ></Image>
    </div>
  );
};

export default King;
