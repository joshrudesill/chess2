import { useSelector } from "react-redux";

const Notation = () => {
  const notation = useSelector((state) => state.board.notation);
  const moveTimes = useSelector((state) => state.board.moveTimes);
  return (
    <>
      {notation?.map((n, i) => (
        <div className='flex flex-row'>
          <div className='flex flex-row bg-neutral-500 p-1 rounded-tl-md rounded-bl-md gap-1 '>
            <p>{`${i + 1}.`}</p>
            <p>{`${n}`}</p>
          </div>
          <div className=' bg-neutral-800 p-1 rounded-tr-md rounded-br-md gap-1'>
            <p>
              {`${
                moveTimes[i] ? Math.abs((moveTimes[i] / 1000).toFixed(1)) : "0"
              }`}
              s
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Notation;
