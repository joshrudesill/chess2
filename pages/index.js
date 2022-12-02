import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Board from "../components/board";
import Sidebar from "../components/sidebar";

export default function Home() {
  const activePiece = useSelector((state) => state.board.activePiece);
  const check = useSelector((state) => state.board.kingData.squaresToBeBlocked);
  const [Socket, st] = useState("");
  return (
    <div className='flex flex-row gap-5 overflow-x-hidden'>
      <Sidebar />
      <div className='grid border w-screen pl-36 pt-16 grid-rows-6 grid-cols-12 gap-4 grid-flow-col'>
        <div className='col-start-2 col-span-9 p-4 bg-neutral-600 rounded-full'>
          <div className='flex w-full'>
            <div className='text-white text-lg font-semibold tracking-wider inline-flex'>
              <UserCircleIcon className='h-7 w-7 mr-1 text-green-400' />
              CornMan123
            </div>
          </div>
        </div>
        <div className='border row-span-12 col-start-5 col-span-4 row-span-6'></div>
        <div className=' border col-start-2 col-span-3'>
          <div className='flex'>
            <div className='bg-neutral-600 rounded-full p-3'>
              <p className='text-white text-lg'>Play Chess 2</p>
            </div>
          </div>
        </div>
        <div className=' border col-start-2 col-span-3 '>
          <div className='flex'>
            <div className='bg-neutral-600 rounded-full p-3'>
              <p className='text-white text-lg'>Play Chess 2</p>
            </div>
          </div>
        </div>
        <div className=' border col-start-2 col-span-3'>
          <div className='flex'>
            <div className='bg-neutral-600 rounded-full p-3'>
              <p className='text-white text-lg'>Play Chess 2</p>
            </div>
          </div>
        </div>
        <div className=' border col-start-2 col-span-3'>
          <div className='flex'>
            <div className='bg-neutral-600 rounded-full p-3'>
              <p className='text-white text-lg'>Play Chess 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
