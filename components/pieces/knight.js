import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkKing,
  removeLegalMovesFromKing,
  setLegalMoves,
} from "../../features/board/boardSlice";
import Image from "next/image";
const white = require("../../assets/whiteknight.svg");
const black = require("../../assets/blackknight.svg");
const Knight = ({ piece }) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.position);
  const whiteKingCalculated = useSelector(
    (state) => state.board.whiteKingCalculated
  );
  const blackKingCalculated = useSelector(
    (state) => state.board.blackKingCalculated
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
              checkKing({ piece: piece, squares: [{ x: piece.x, y: piece.y }] })
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

export default Knight;
