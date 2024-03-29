import { useEffect, useState } from "react";
import useScreenSize from "../util/usescreensize";
import {
  FlagIcon,
  HandThumbUpIcon,
  TrophyIcon,
  InformationCircleIcon,
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
        <div className='w-36 inline-flex hover:bg-neutral-500 p-3 font-semibold text-white hover:skew-y-3 cursor-pointer text-md'>
          <TrophyIcon className='h-6 w-6 mt-0.5 mr-2 text-green-500 ' />
          Play
        </div>
        <div className='w-36 inline-flex hover:bg-neutral-500 p-3 font-semibold text-white hover:skew-y-3 cursor-pointer text-md'>
          <InformationCircleIcon className='h-6 w-6 mt-0.5 mr-2 text-blue-400 ' />
          More Info
        </div>
      </div>
      <div className='flex w-[85vmin] md:w-max mx-auto md:mx-0 flex-col lg:flex-row gap-3 md:ml-48 overflow-x-hidden'>
        <div className='flex flex-col md:flex-row justify-center gap-3 mt-8'>
          <div className='md:shrink w-[100%] md:w-[88vmin] overflow-x-hidden'>
            <div className='grid grid-cols-8 grid-rows-8'></div>
          </div>
        </div>
        <div className='lg:w-[30vw] w-11/12 border rounded-md border-neutral-600 divide-neutral-600 shadow-lg flex flex-col divide-y  text-white mx-auto md:mx-0 lg:mt-8 lg:mr-2'>
          <div className='flex justify-between p-2'>
            <p className='font-mono md:text-2xl lg:text-xl mr-4 border rounded-lg px-2'>
              8:42
            </p>
            <p className='font-mono md:text-2xl text-neutral-400 lg:text-xl ml-4'>
              9:21
            </p>
          </div>
          <div className='flex flex-row justify-center gap-x-1 p-3 text-xs'>
            <p className='font-sans xl:text-lg '>CornMan123</p>
            <p className='font-mono xl:text-xl grow text-center'>VS</p>
            <p className='font-sans xl:text-lg'>noobslayer16</p>
          </div>
          <div className='flex grow flex-row flex-wrap content-start text-xs'>
            <div className='flex bg-neutral-700 w-full p-1 justify-between'>
              <div>1. Kxb2</div>
              <div>1.3s</div>
            </div>
            <div className='flex w-full p-1 justify-between'>
              <div>2. e1</div>
              <div>2.8s</div>
            </div>
            <div className='flex bg-neutral-700 w-full p-1 justify-between'>
              <div>3. c5</div>
              <div>4.1s</div>
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
/*<div className='grid w-screen pl-36 pt-16 grid-rows-none grid-cols-12 gap-4 grid-flow-col'>
        <div className='col-start-2 col-span-9 row-span-1 p-4 bg-neutral-600 rounded-lg'>
          <div className='flex w-full'>
            <div className='text-white text-lg font-semibold tracking-wider inline-flex'>
              <UserCircleIcon className='h-7 w-7 mr-1 text-green-400' />
              CornMan123
            </div>
          </div>
        </div>
        <div className='col-start-2 col-span-9 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg '>
          <div className='flex flex-row p-2 gap-3'>
            <div className='flex basis-1/5'>
              <Image src={logo} alt='logo' layout='intrinsic'></Image>
            </div>
            <div className='flex flex-col basis-1/2 gap-2'>
              <p className='text-white text-5xl font-semibold'>Chess 2</p>
              <p className='text-white text-lg font-light'>
                The long awaited update to chess
              </p>
              <p className='text-white underline text-md font-light'>Rules</p>
            </div>
            <div className='flex flex-col p-5 gap-3 basis-[30%]'>
              <button className='bg-green-500 px-3 py-3 text-3xl rounded-md text-white font-medium border-2 border-black'>
                Play Now
              </button>
              <select className='bg-green-500 px-3 py-2 text-2xl rounded-md text-white font-light border-1 border-black'>
                <option>3 min</option>
                <option>5 min</option>
                <option>10 min</option>
                <option>15 min</option>
              </select>
            </div>
          </div>
        </div>
        <div className='col-start-2 col-span-9'>
          <div className='flex flex-row gap-4'>
            <div className='flex flex-col gap-4 basis-2/3'>
              <div className='flex bg-neutral-600 p-3 rounded-lg gap-2'>
                <p className='text-white text-xl mr-auto self-center'>
                  Chess Classic
                </p>
                <select className=' bg-green-500 text-md rounded-md text-white font-light '>
                  <option>3 min</option>
                  <option>5 min</option>
                  <option>10 min</option>
                  <option>15 min</option>
                </select>
                <button className='bg-green-500 px-3 py-3 text-md rounded-md text-white font-medium '>
                  Play
                </button>
              </div>
              <div className='flex bg-neutral-600 p-3 rounded-lg gap-2'>
                <p className='text-white text-xl mr-auto self-center'>TBD</p>
                <select className=' bg-green-500 text-md rounded-md text-white font-light '>
                  <option>3 min</option>
                  <option>5 min</option>
                  <option>10 min</option>
                  <option>15 min</option>
                </select>
                <button className='bg-green-500 px-3 py-3 text-md rounded-md text-white font-medium '>
                  Play
                </button>
              </div>
              <div className='flex bg-neutral-600 p-3 rounded-lg gap-2'>
                <p className='text-white text-xl mr-auto self-center'>
                  Fischer Random
                </p>
                <select className=' bg-green-500 text-md rounded-md text-white font-light '>
                  <option>3 min</option>
                  <option>5 min</option>
                  <option>10 min</option>
                  <option>15 min</option>
                </select>
                <button className='bg-green-500 px-3 py-3 text-md rounded-md text-white font-medium '>
                  Play
                </button>
              </div>
            </div>
            <div className='bg-neutral-600 basis-1/3 rounded-md flex flex-col divide-y divide-neutral-500'>
              <p className='text-white p-3'>
                {formattedTime} - {ms} - {tt}
              </p>
              <div className='text-white p-3 flex flex-row justify-between'>
                <button
                  className='border p-1'
                  onClick={() => {
                    const s = dayjs().utc();
                    startTimer(s);
                  }}
                >
                  Start
                </button>
                <button className='border p-1' onClick={() => stopTimer()}>
                  STOP
                </button>
                <button
                  className='border p-1'
                  onClick={() => resumeTimerWithOffset(5000)}
                >
                  ResumeO
                </button>
                <button className='border p-1' onClick={() => clearTimer()}>
                  Start
                </button>
              </div>
              <div className='text-white p-3 flex flex-row justify-between'>
                <p>Games</p>
                <p>50</p>
              </div>
              <div className='text-white p-3 flex flex-row justify-between'>
                <p>W/L</p>
                <p>20/25</p>
              </div>
            </div>
          </div>
        </div>
      </div> */
