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
  return (
    <>
      <div className='flex flex-row w-screen h-screen'>
        <Sidebar />
        <div className='flex justify-center h-full grow'>
          <div className='flex border border-neutral-500 rounded-md flex-col gap-5 my-auto h-min w-min p-3'>
            <div className='flex flex-col justify-center items-center gap-2'>
              <div className='text-2xl font-light'>Chess v1.0</div>
              <div>
                <button className='rounded-sm bg-green-500 py-2 px-4 text-lg'>
                  Play
                </button>
              </div>
            </div>
            <div className='flex flex-row gap-3'>
              <div className='border border-neutral-500 rounded-md basis-1/2 w-80'>
                LOGO
              </div>
              <div className='flex justify-center border border-neutral-500 rounded-md basis-1/2 flex-wrap py-5 px-5'>
                <h1 className='flex justify-center w-full font-bold text-2xl mx-auto'>
                  Chess
                </h1>
                <h2 className='flex justify-center w-full font-bold text-2xl mx-auto'>
                  <p className='border flex justify-center flex-col p-1 px-2 h-min rounded-md'>
                    v2.0
                  </p>
                </h2>
                <h2 className='flex justify-center w-full font-bold text-sm mx-auto'>
                  coming soon
                </h2>
              </div>
            </div>
            <div>
              more infomore infonfomore infonfomore infonfomore infonfomore
              infonfomore infonfomore infonfomore infonfomore infonfomore
              infonfomore infonfomore infonfomore info
            </div>
            <div className='flex flex-row justify-between p-2'>
              <button className='rounded-sm bg-green-500 py-2 px-4'>
                link
              </button>
              <button className='rounded-sm bg-green-500 py-2 px-4'>
                link
              </button>
              <button className='rounded-sm bg-green-500 py-2 px-4'>
                link
              </button>
              <button className='rounded-sm bg-green-500 py-2 px-4'>
                link
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
