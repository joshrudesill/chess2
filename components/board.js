import { useSelector } from "react-redux";
import BoardSquare from "./boardSquare";
import { useState } from "react";
const Board = ({ play }) => {
  const {
    board,
    activePiece,
    myTurn,
    mouseDragging,
    white,
    lastMove,
    blackKingCanCastle,
    whiteKingCanCastle,
    promotionOpen,
  } = useSelector((state) => ({
    board: state.board.position,
    activePiece: state.board.activePiece,
    myTurn: state.board.myTurn,
    mouseDragging: state.board.mouseDragging,
    white: state.board.white,
    lastMove: state.board.lastMove,
    whiteKingCanCastle: state.board.whiteKingCanCastle,
    blackKingCanCastle: state.board.blackKingCanCastle,
    promotionOpen: state.board.promotionOpen,
  }));
  const [pieceX, setX] = useState(0);
  const [pieceY, setY] = useState(0);
  const mouseMove = (e) => {
    setX(e.pageX);
    setY(e.pageY);
  };
  //  <DraggablePiece x={pieceX} y={pieceY} /> onMouseLeave={() => dispatch(resetActivePiece())}
  return (
    <>
      <div
        className={`flex flex-col md:flex-row justify-center gap-3 mt-8 `}
        onMouseMove={mouseMove}
      >
        <div className='md:shrink w-[100%] md:w-[88vmin] overflow-x-hidden'>
          <div className='grid grid-cols-8 grid-rows-8'>
            {white === true || white === null
              ? board.map((bs, j) => {
                  return bs.map((b, e) => (
                    <BoardSquare
                      play={play} //use callback
                      squareData={b}
                      j={j}
                      e={e}
                      x={pieceX}
                      y={pieceY}
                      activePiece={activePiece}
                      myTurn={myTurn}
                      white={white}
                      mouseDragging={mouseDragging}
                      lastMove={lastMove}
                      whiteKingCanCastle={whiteKingCanCastle}
                      blackKingCanCastle={blackKingCanCastle}
                      promotionOpen={promotionOpen}
                      key={(j + 1) * (e + 1) * (j + 1)}
                    />
                  ));
                })
              : board
                  .map((bs, j) => {
                    return bs
                      .map((b, e) => (
                        <BoardSquare
                          play={play}
                          squareData={b}
                          j={j}
                          e={e}
                          x={pieceX}
                          y={pieceY}
                          activePiece={activePiece}
                          myTurn={myTurn}
                          white={white}
                          mouseDragging={mouseDragging}
                          lastMove={lastMove}
                          whiteKingCanCastle={whiteKingCanCastle}
                          blackKingCanCastle={blackKingCanCastle}
                          promotionOpen={promotionOpen}
                          key={(j + 1) * (e + 1) * (j + 1)}
                        />
                      ))
                      .reverse();
                  })
                  .reverse()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
