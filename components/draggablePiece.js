import { useEffect, useRef } from "react";
const white = require("../assets/whiteking.svg");
const black = require("../assets/blackking.svg");
import Image from "next/image";
const DraggablePiece = ({ x, y }) => {
  const pieceX = useRef(0);
  const pieceY = useRef(0);
  useEffect(() => {
    pieceX.current = x;
    pieceY.current = y;
  }, [x, y]);
  return (
    <div
      style={{
        position: "absolute",
        left: `${x - 81}px`,
        top: `${y - 126}px`,
      }}
      className='z-50'
    >
      <Image
        src={white}
        alt='king'
        draggable='false'
        width={100}
        height={100}
        unselectable='true'
      ></Image>
    </div>
  );
};

export default DraggablePiece;
