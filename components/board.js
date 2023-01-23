import { useDispatch, useSelector } from "react-redux";
import BoardSquare from "./boardSquare";
import DraggablePiece from "./draggablePiece";
import { useEffect, useRef, useState } from "react";
import { resetActivePiece } from "../features/board/boardSlice";
const Board = () => {
  const board = useSelector((state) => state.board.position);
  const activePiece = useSelector((state) => state.board.activePiece);
  const myTurn = useSelector((state) => state.board.myTurn);
  const mouseDragging = useSelector((state) => state.board.mouseDragging);
  const white = useSelector((state) => state.board.white);
  const a = Array.from(Array(8).keys());
  const dispatch = useDispatch();
  const [pieceX, setX] = useState(0);
  const [pieceY, setY] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const mouseMove = (e) => {
    setX(e.pageX);
    setY(e.pageY);
  };
  //  <DraggablePiece x={pieceX} y={pieceY} /> onMouseLeave={() => dispatch(resetActivePiece())}
  return (
    <>
      <div
        className={`flex flex-col md:flex-row justify-center gap-3 mt-8 ${
          mouseDown ? "cursor-grabbing" : "cursor-pointer"
        }`}
        onMouseMove={mouseMove}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      >
        <div className='md:shrink w-[100%] md:w-[88vmin] overflow-x-hidden'>
          <div className='grid grid-cols-8 grid-rows-8'>
            {white === true || white === null
              ? board.map((bs, j) => {
                  return bs.map((b, e) => (
                    <BoardSquare
                      squareData={b}
                      j={j}
                      e={e}
                      x={pieceX}
                      y={pieceY}
                      activePiece={activePiece}
                      myTurn={myTurn}
                      white={white}
                      mouseDragging={mouseDragging}
                      key={(j + 1) * (e + 1) * (j + 1)}
                    />
                  ));
                })
              : board
                  .map((bs, j) => {
                    return bs
                      .map((b, e) => (
                        <BoardSquare
                          squareData={b}
                          j={j}
                          e={e}
                          x={pieceX}
                          y={pieceY}
                          activePiece={activePiece}
                          myTurn={myTurn}
                          white={white}
                          mouseDragging={mouseDragging}
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
