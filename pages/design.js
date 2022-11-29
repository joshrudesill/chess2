import { useEffect, useState } from "react";
import useScreenSize from "../util/usescreensize";
import {
  FlagIcon,
  HandThumbUpIcon,
  TrophyIcon,
} from "@heroicons/react/20/solid";
import { Tooltip } from "flowbite-react";
/* eslint-disable react/jsx-key */
const Design = () => {
  const a = Array.from(Array(8).keys());
  const [boardSize, setBoardSize] = useState("");
  const { height, width } = useScreenSize();
  useEffect(() => {
    if (width >= 640 && width < 768) {
      setBoardSize("SMALL");
    } else if (width >= 768 && width < 1024) {
      setBoardSize("MEDIUM");
    } else if (width >= 1024 && width < 1280) {
      setBoardSize("LARGE");
    } else if (width >= 1280 && width < 1536) {
      setBoardSize("XL");
    } else if (width >= 1536) {
      setBoardSize("2XL");
    }
  }, [height, width]);
  return (
    <div className='flex flex-row gap-5 overflow-x-hidden'>
      <div className='hidden md:flex fixed flex-col w-36 bg-neutral-700 h-screen '>
        <div className='w-36 flex-initial flex hover:bg-neutral-500 p-3'>
          {boardSize}
        </div>
        <div className='w-36 inline-flex hover:bg-neutral-500 p-3 font-semibold text-white hover:skew-y-3 cursor-pointer text-lg'>
          <TrophyIcon className='h-6 w-6 mt-0.5 mr-2 text-green-500 ' />
          Play
        </div>
      </div>
      <div className='flex w-[85vmin] md:w-max mx-auto md:mx-0 flex-col lg:flex-row gap-3 md:ml-48 overflow-x-hidden'>
        <div className='flex flex-col md:flex-row justify-center gap-3 mt-8'>
          <div className='md:shrink w-[100%] md:w-[88vmin] overflow-x-hidden'>
            <div className='grid grid-cols-8 grid-rows-8'>
              {a.map((j) => {
                return a.map((e) => (
                  <div
                    className={`aspect-square  ${
                      j % 2 === 0
                        ? e % 2 === 0
                          ? "bg-emerald-800"
                          : "bg-stone-400"
                        : e % 2 !== 0
                        ? "bg-emerald-800 "
                        : "bg-stone-400"
                    }`}
                  ></div>
                ));
              })}
            </div>
          </div>
        </div>
        <div className='lg:w-[30vw] w-11/12 border rounded-md border-neutral-600 divide-neutral-600 shadow-lg flex flex-col divide-y  text-white mx-auto md:mx-0 lg:mt-8 lg:mr-2'>
          <div className='flex justify-between p-3'>
            <p className='font-mono md:text-2xl lg:text-xl mr-4'>10:00</p>
            <p className='font-mono md:text-2xl text-neutral-400 lg:text-xl ml-4'>
              10:00
            </p>
          </div>
          <div className='flex flex-row justify-center gap-x-1 p-3 text-xs'>
            <p className='font-sans xl:text-lg '>Player1</p>
            <p className='font-mono xl:text-xl grow text-center'>VS</p>
            <p className='font-sans xl:text-lg'>Player2</p>
          </div>
          <div className='flex grow flex-row flex-wrap content-start text-xs'>
            <div className='flex bg-neutral-700 w-full p-1 justify-between'>
              <div>1. Kxb2</div>
              <div>1.3s</div>
            </div>
            <div className='flex w-full p-1 justify-between'>
              <div>1. Kxb2</div>
              <div>1.3s</div>
            </div>
            <div className='flex bg-neutral-700 w-full p-1 justify-between'>
              <div>1. Kxb2</div>
              <div>1.3s</div>
            </div>
            <div className='flex w-full p-1 justify-between'>
              <div>1. Kxb2</div>
              <div>1.3s</div>
            </div>
            <div className='flex bg-neutral-700 w-full p-1 justify-between'>
              <div>1. Kxb2</div>
              <div>1.3s</div>
            </div>
            <div className='flex w-full p-1 justify-between'>
              <div>1. Kxb2</div>
              <div>1.3s</div>
            </div>
            <div className='flex bg-neutral-700 w-full p-1 justify-between'>
              <div>1. Kxb2</div>
              <div>1.3s</div>
            </div>
            <div className='flex w-full p-1 justify-between'>
              <div>1. Kxb2</div>
              <div>1.3s</div>
            </div>
          </div>
          <div className='flex flex-row flex-wrap p-1'>
            <button
              type='button'
              className='inline-flex text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-xs px-2 py-2 text-center mx-1 my-2'
            >
              Resign
              <FlagIcon className='h-4 w-4 text-white ml-2' />
            </button>
            <Tooltip content='EX' style='light' className='text-xs'>
              <button
                type='button'
                className='inline-flex text-yellow-500 hover:text-white border border-yellow-600 hover:bg-yellow-600 font-medium rounded-lg text-xs px-2 py-2 text-center mx-1 my-2'
              >
                Draw
                <HandThumbUpIcon className='h-4 w-4 text-white ml-2' />
              </button>
            </Tooltip>
          </div>
          <div className='flex p-2'>
            <p className='font-mono text-s lg:text-lg underline '>
              Variant name
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Design;
