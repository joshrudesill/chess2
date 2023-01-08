import { useDispatch, useSelector } from "react-redux";
import BoardSquare from "./boardSquare";

const Board = () => {
  const board = useSelector((state) => state.board.position);
  const activePiece = useSelector((state) => state.board.activePiece);
  const myTurn = useSelector((state) => state.board.myTurn);
  const white = useSelector((state) => state.board.white);
  const a = Array.from(Array(8).keys());
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col md:flex-row justify-center gap-3 mt-8'>
      <div className='md:shrink w-[100%] md:w-[88vmin] overflow-x-hidden'>
        <div className='grid grid-cols-8 grid-rows-8'>
          {board.map((bs, j) => {
            return bs.map((b, e) => (
              <BoardSquare
                squareData={b}
                j={j}
                e={e}
                activePiece={activePiece}
                myTurn={myTurn}
                white={white}
                key={(j + 1) * (e + 1) * (j + 1)}
              />
            ));
          })}
        </div>
      </div>
    </div>
  );
};

export default Board;
