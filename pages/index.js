import { UserCircleIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Board from "../components/board";
import Sidebar from "../components/sidebar";
import useTimer from "../util/usetimer";
const logo = require("../assets/Frame2.svg");
export default function Home() {
  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <Sidebar />
        <div className="flex justify-center h-full grow">
          <div className="flex rounded-md flex-col gap-5 my-auto h-min w-min p-3">
            <div className="flex flex-row items-center gap-3 border-b border-neutral-600 pb-1">
              <div className="flex flex-col p-1">
                <div className="flex flex-row gap-1">
                  <span className="text-2xl font-semibold tracking-wider rounded-md text-white align-text-bottom">
                    Chess
                  </span>
                  <div className="flex flex-col justify-center px-1 rounded-lg text-xs bg-orange-500 text-white">
                    <p>v1.0</p>
                  </div>
                </div>
                <div className="flex flex-row text-neutral-200 text-xs">
                  classic edition
                </div>
              </div>
              <div>
                <button className="rounded-md bg-lime-600 py-2 px-4 text-lg font-bold text-white border-b-4 border-lime-700 tracking-wider hover:bg-lime-500">
                  Play
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-3 rounded-3xl border-neutral-800">
              <div className="flex flex-col justify-center s rounded-3xl basis-1/2 flex-wrap py-5 px-5 shadow-lg bg-neutral-500 border-b-8 border-neutral-800">
                <div className="flex flex-row gap-1 mx-auto ">
                  <span className="text-3xl font-semibold tracking-wider rounded-md text-white align-text-bottom">
                    Chess
                  </span>
                  <div className="flex flex-col justify-center px-2 rounded-xl text-md bg-teal-500 text-white border-b-4 border-teal-700">
                    <p>v2.0</p>
                  </div>
                </div>
                <h2 className="flex justify-center w-full font-bold text-sm ">
                  coming soon
                </h2>
              </div>
              <div className="relative rounded-3xl basis-1/2 w-72 h-48 ">
                <Image
                  src={logo}
                  alt="chess2logo"
                  layout="fill"
                  objectFit="contain"
                ></Image>
              </div>
            </div>
            <div>
              Chess2 is a project made by me, Josh Rudesill for my web
              development portfolio. It is built using React / Next.js,
              Websockets (socket.io), Express.js, MongoDB and Tailwind.
              <br />
              This project is still being actively developed! Report bugs on
              GitHub
            </div>
            <div className="flex flex-row justify-between p-2">
              <button className="rounded-sm bg-green-500 py-2 px-4">
                link
              </button>
              <button className="rounded-sm bg-green-500 py-2 px-4">
                link
              </button>
              <button className="rounded-sm bg-green-500 py-2 px-4">
                link
              </button>
              <button className="rounded-sm bg-green-500 py-2 px-4">
                link
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
