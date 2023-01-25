import Image from "next/image";
import { useEffect, useRef, useState } from "react";
const whiteking = require("../assets/whiteking.svg");
const blackking = require("../assets/blackking.svg");
const whitequeen = require("../assets/whitequeen.svg");
const blackqueen = require("../assets/blackqueen.svg");
const whitebishop = require("../assets/whitebishop.svg");
const blackbishop = require("../assets/blackbishop.svg");
const blackknight = require("../assets/blackknight.svg");
const whiteknight = require("../assets/whiteknight.svg");
const whitepawn = require("../assets/whitepawn.svg");
const blackpawn = require("../assets/blackpawn.svg");
const blackrook = require("../assets/blackrook.svg");
const whiterook = require("../assets/whiterook.svg");
/*
    0 - King
    1 - Pawn
    2 - Rook
    3 - Bishop
    4 - Knight
    5 - Queen
*/
const TakenPiece = ({ white, type }) => {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    if (white) {
      if (type === 0) setSrc(whiteking);
      if (type === 1) setSrc(whitepawn);
      if (type === 2) setSrc(whiterook);
      if (type === 3) setSrc(whitebishop);
      if (type === 4) setSrc(whiteknight);
      if (type === 5) setSrc(whitequeen);
    } else {
      if (type === 0) setSrc(blackking);
      if (type === 1) setSrc(blackpawn);
      if (type === 2) setSrc(blackrook);
      if (type === 3) setSrc(blackbishop);
      if (type === 4) setSrc(blackknight);
      if (type === 5) setSrc(blackqueen);
    }
  }, [white, type]);
  const boxRef = useRef(null);
  return (
    <div ref={boxRef} className='h-full'>
      {src ? (
        <Image
          src={src}
          height={boxRef.current.clientHeight * 0.9}
          width={boxRef.current.clientHeight * 0.9}
        />
      ) : (
        <div style={{ height: "15px" }}></div>
      )}
    </div>
  );
};
export default TakenPiece;
