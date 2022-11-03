import { useDispatch, useSelector } from "react-redux";
import BoardSquares from "./boardSquares";

const Board = () => {
  const board = useSelector((state) => state.board.position);
  const dispatch = useDispatch();
  return (
    <div className="columns is-centered mt-6">
      <div className="column is-8">
        {board.map((bs, i) => (
          <BoardSquares key={i} rowData={bs} row={i} />
        ))}
      </div>
    </div>
  );
};

export default Board;
