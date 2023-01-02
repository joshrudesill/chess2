import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLegalMoves } from "../../features/board/boardSlice";

const Pawn = ({ piece }) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.position);
  const activePiece = useSelector((state) => state.board.activePiece);
  const whiteKingCalculated = useSelector(
    (state) => state.board.whiteKingCalculated
  );
  const blackKingCalculated = useSelector(
    (state) => state.board.blackKingCalculated
  );

  const calculateLegalMoves = () => {
    var legalMoves = [];

    const xDirection = piece.white ? 1 : -1;

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

      if (y + 1 <= 7 && y - 1 >= 0) {
        //Capturing
        if (
          board[piece.x + xDirection][piece.y + 1].piece !== null &&
          board[piece.x + xDirection][piece.y + 1].piece.white !== piece.white
        ) {
          legalMoves.push({ x: piece.x + xDirection, y: piece.y + 1 });
        }

        if (
          board[piece.x + xDirection][piece.y - 1].piece !== null &&
          board[piece.x + xDirection][piece.y - 1].piece.white !== piece.white
        ) {
          legalMoves.push({ x: piece.x + xDirection, y: piece.y - 1 });
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

  return (
    <div>
      P{piece.pinned ? "p" : ""}
      {piece.pinDirection !== null ? piece.pinDirection : ""}
    </div>
  );
};

export default Pawn;
