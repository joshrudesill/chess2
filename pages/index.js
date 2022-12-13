import { UserCircleIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Board from "../components/board";
import Sidebar from "../components/sidebar";
import useTimer from "../util/usetimer";
const logo = require("../assets/Frame1.svg");
export default function Home() {
  const activePiece = useSelector((state) => state.board.activePiece);
  const check = useSelector((state) => state.board.kingData.squaresToBeBlocked);
  const [Socket, st] = useState("");
  const {
    ms,
    isPaused,
    isRunning,
    startTimeRef,
    startTimer,
    stopTimer,
    resumeTimer,
    clearTimer,
    resumeTimerWithOffset,
    formattedTime,
    tt,
  } = useTimer(10);
  return (
    <div className='flex flex-row gap-5 overflow-x-hidden'>
      <Sidebar />
      <div className='grid w-screen pl-36 pt-16 grid-rows-none grid-cols-12 gap-4 grid-flow-col'>
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
      </div>
    </div>
  );
}
