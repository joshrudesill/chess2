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
        left: "0",
        top: "0",
        transform: `translate(${x}px, ${y}px)`,
      }}
      className='z-50 pointer-events-none'
    >
      <svg
        width='100px'
        height='100px'
        viewBox='0 0 161 163'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clip-path='url(#clip0_101_109)'>
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M17.1 146.35C33.033 141.791 64.617 148.371 80.55 136.95C96.483 148.371 128.067 141.791 144 146.35C144 146.35 151.755 148.888 158.1 155.75C154.904 160.309 150.345 160.403 144 158.1C128.067 153.541 96.483 160.262 80.55 153.4C64.617 160.262 33.033 153.541 17.1 158.1C10.7362 160.403 6.1819 160.309 3 155.75C9.3638 146.632 17.1 146.35 17.1 146.35Z'
            fill='white'
            stroke='black'
            stroke-width='5'
            stroke-linejoin='round'
          />
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M45.3001 127.55C57.0501 139.3 104.05 139.3 115.8 127.55C118.15 120.5 115.8 118.15 115.8 118.15C115.8 106.4 104.05 99.35 104.05 99.35C129.9 92.3 132.25 45.3 80.5501 26.5C28.8501 45.3 31.2001 92.3 57.0501 99.35C57.0501 99.35 45.3001 106.4 45.3001 118.15C45.3001 118.15 42.9501 120.5 45.3001 127.55Z'
            fill='white'
            stroke='black'
            stroke-width='5'
            stroke-linejoin='round'
          />
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M92.3 14.75C92.3 17.8663 91.0621 20.855 88.8586 23.0585C86.655 25.2621 83.6663 26.5 80.55 26.5C77.4338 26.5 74.4451 25.2621 72.2415 23.0585C70.038 20.855 68.8 17.8663 68.8 14.75C68.8 11.6337 70.038 8.64505 72.2415 6.4415C74.4451 4.23794 77.4338 3 80.55 3C83.6663 3 86.655 4.23794 88.8586 6.4415C91.0621 8.64505 92.3 11.6337 92.3 14.75V14.75Z'
            fill='white'
            stroke='black'
            stroke-width='5'
            stroke-linejoin='round'
          />
          <path
            d='M57.05 99.35H104.05M45.3 118.15H115.8M80.55 50V73.5M68.8 61.75H92.3'
            stroke='black'
            stroke-width='5'
            stroke-linecap='round'
          />
        </g>
        <defs>
          <clipPath id='clip0_101_109'>
            <rect width='161' height='163' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default DraggablePiece;
