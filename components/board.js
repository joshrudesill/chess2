import { useDispatch, useSelector } from "react-redux";
import BoardSquare from "./boardSquare";
import {
  FlagIcon,
  HandThumbUpIcon,
  TrophyIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
const Board = () => {
  const board = useSelector((state) => state.board.position);
  const a = Array.from(Array(8).keys());
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col md:flex-row justify-center gap-3 mt-8'>
      <div className='md:shrink w-[100%] md:w-[88vmin] overflow-x-hidden'>
        <div className='grid grid-cols-8 grid-rows-8'>
          {board.map((bs, j) => {
            return bs.map((b, e) => <BoardSquare squareData={b} j={j} e={e} />);
          })}
        </div>
      </div>
    </div>
  );
};
const BoardDEP = () => {
  const board = useSelector((state) => state.board.position);
  const dispatch = useDispatch();
  return (
    <div className='columns is-centered mt-6'>
      <div className='column is-8'>
        {board.map((bs, i) => (
          <BoardSquares key={i} rowData={bs} row={i} />
        ))}
      </div>
    </div>
  );
};

export default Board;
