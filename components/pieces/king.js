import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pinPiece,
  setLegalMoves,
  setKingCalculated,
  recheckLegalMoves,
} from "../../features/board/boardSlice";

const King = ({ piece }) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.position);
  const inCheck = useSelector((state) => state.board.kingData.inCheck);
  const squaresToBeBlocked = useSelector(
    (state) => state.board.kingData.squaresToBeBlocked
  );

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

    dispatch(setLegalMoves({ piece: piece, moves: [] }));
    dispatch(setKingCalculated());
  };

  useEffect(() => {
    if (!piece.legalMovesUpdated) {
      calculateLegalMoves();
    }
  }, [piece.legalMovesUpdated]);

  useEffect(() => {
    if (inCheck) {
      console.log("fired");
      dispatch(recheckLegalMoves());
    }
  }, [inCheck]);

  return <div>K</div>;
};

export default King;
