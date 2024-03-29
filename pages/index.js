import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";
import {
  MarkGithubIcon,
  SmileyIcon,
  CodeReviewIcon,
  LogIcon,
} from "@primer/octicons-react";
import Image from "next/image";
import Sidebar from "../components/sidebar";
const logo = require("../assets/Frame2.svg");
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGame, setSession } from "../features/app/appSlice";
import { setChatOnReconnect } from "../features/board/boardSlice";
import socket from "../socket";
export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [inQueue, setInQueue] = useState(false);
  const [awaitingQueue, setAwaitingInQueue] = useState(false);
  const { sessionID, gameID } = useSelector((state) => ({
    sessionID: state.app.sessionDetails.sessionID,
    gameID: state.app.sessionDetails.gameID,
  }));
  const joinQueue = () => {
    if (!awaitingQueue) {
      socket.emit("joinQueue");
      setAwaitingInQueue(true);
    }
  };
  const leaveQueue = () => {
    if (!awaitingQueue) {
      socket.emit("leaveQueue");
      setAwaitingInQueue(false);
      setInQueue(false);
    }
  };
  const joinEngineQueue = () => {
    if (!awaitingQueue) {
      socket.emit("joinEngineQueue");
      setAwaitingInQueue(true);
    }
  };
  useEffect(() => {
    const sid = localStorage.getItem("sessionID");
    if (sid) {
      socket.auth = { sid };
      socket.connect();
    } else {
      const un = "testUser" + Math.floor(Math.random() * 500).toString();
      socket.auth = { un };
      socket.connect();
    }
  }, []);
  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "sidInvalid") {
        const un = "testUser" + Math.floor(Math.random() * 500).toString();
        socket.auth = { un };
        socket.connect();
      }
    });
    socket.on("queueJoined", () => {
      //
      setAwaitingInQueue(false);
      setInQueue(true);
    });
    socket.on("sessionStart", (sid, un, uid, gid) => {
      localStorage.setItem("sessionID", sid);
      dispatch(setSession({ sid, un, uid, gid }));
      if (gid !== null) {
        router.push("/play");
      }
    });
    socket.on("gameRoomCreated", (gid, messages) => {
      dispatch(setGame(gid));
      dispatch(setChatOnReconnect(messages));
      router.push("/play");
    });
    socket.on("engineRoomCreated", (gid, messages) => {
      dispatch(setGame(gid));
      dispatch(setChatOnReconnect(messages));
      router.push("/playengine");
    });
    return () => {
      socket.off("connect");
      socket.off("sessionStart");
      socket.off("connect_error");
      socket.off("gameRoomCreated");
    };
  });
  return (
    <>
      <div className='flex flex-row w-screen h-screen'>
        <div className='flex justify-center h-full grow'>
          <div className='flex rounded-md flex-col gap-4 my-auto h-min w-min p-3'>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-row items-center gap-3'>
                <div className='flex flex-col p-1'>
                  <div className='flex flex-row gap-1'>
                    <span className='text-2xl font-semibold tracking-wider rounded-md text-white align-text-bottom select-none'>
                      Chess
                    </span>
                    <div className='flex flex-col justify-center px-1 rounded-lg text-xs bg-orange-500 text-white select-none'>
                      <p>v1.0</p>
                    </div>
                  </div>
                  <div className='flex flex-row text-xs select-none'>
                    classic edition
                  </div>
                </div>

                <div className='grow flex justify-end'>
                  {inQueue ? (
                    <div className='text-white rounded-md border border-lime-700 p-1 flex flex-row text-lg pl-2 select-none'>
                      in queue
                      <MagnifyingGlassCircleIcon className='h-6 w-6 text-lime-600 my-auto ml-1 animate-pulse' />
                    </div>
                  ) : (
                    <div className='text-white text-sm rounded-md border border-lime-700 border-b-4 py-1 px-2 flex flex-row my-auto select-none'>
                      Players Online: 1
                    </div>
                  )}
                </div>
              </div>
              <div className='flex flex-row gap-2 border-b border-neutral-600 pb-2'>
                {inQueue ? (
                  <div className='flex-start'>
                    <button
                      className=' rounded-md bg-red-600 py-2 px-4 text-lg font-bold text-white border-b-4 border-red-800 tracking-wider hover:bg-red-500 active:translate-y-1 active:border-0'
                      onClick={() => leaveQueue()}
                    >
                      Leave Queue
                    </button>
                  </div>
                ) : (
                  <button
                    className='w-[50%] rounded-md bg-lime-600 py-2 px-4 text-lg font-bold text-white border-b-4 border-lime-700 tracking-wider hover:bg-lime-500 active:translate-y-1 active:border-0'
                    onClick={() => joinQueue()}
                  >
                    {awaitingQueue ? "Joining.." : "Play vs Human"}
                  </button>
                )}
                {inQueue ? (
                  <div className='text-xs basis-1/2 text-center border-2 rounded-md flex px-2 items-center font-bold border-neutral-400'>
                    If no one is online, leave the queue and click play engine
                  </div>
                ) : (
                  <></>
                )}
                {!awaitingQueue && !inQueue ? (
                  <button
                    className='w-[50%] rounded-md bg-orange-600 py-1 px-4 text-lg font-bold text-white border-b-4 ml-2 border-orange-800 tracking-wider hover:bg-orange-500 active:translate-y-1 active:border-0 flex flex-col justify-center items-center'
                    onClick={() => joinEngineQueue()}
                  >
                    <p>Play vs Engine</p>
                    <p className='text-xs text-black'>Recommended</p>
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className='flex flex-row gap-3 rounded-3xl border-neutral-800'>
              <div className='flex flex-col justify-center s rounded-3xl basis-1/2 flex-wrap py-5 px-5 shadow-lg bg-neutral-500 border-b-8 border-neutral-800'>
                <div className='flex flex-row gap-1 mx-auto '>
                  <span className='text-3xl font-semibold tracking-wider rounded-md text-white align-text-bottom select-none'>
                    Chess
                  </span>
                  <div className='flex flex-col justify-center px-2 rounded-xl text-md bg-teal-500 text-white border-b-4 border-teal-700 select-none'>
                    <p>v2.0</p>
                  </div>
                </div>
                <h2 className='flex justify-center w-full font-bold text-sm  select-none'>
                  coming soon
                </h2>
              </div>
              <div className='relative rounded-3xl basis-1/2 h-48 md:h-56 w-56 md:w-80'>
                <Image
                  src={logo}
                  alt='chess2logo'
                  layout='fill'
                  objectFit='contain'
                  loading='lazy'
                ></Image>
              </div>
            </div>
            <div className='text-white tracking-wide rounded-md border-2 border-neutral-500 flex justify-between'>
              <div className='p-4 grow max-w-[95%]'>
                Chess2 is a project made by me, Josh Rudesill for my web
                development portfolio. It&apos;s built using React / Next,
                Websockets (socket.io), Express, MongoDB and Tailwind.
              </div>
              <div className='border-l-2 border-neutral-500 bg-neutral-500 w-3'></div>
            </div>
            <div className='border-2 rounded-md border-red-500 text-white font-semibold tracking-wide flex'>
              <div className='grow p-2'>
                This project is still being actively developed! <br />
                Report bugs on GitHub
              </div>
              <div className='border-l-2 border-red-500 bg-red-500 w-3' />
            </div>
            <div className='flex flex-row justify-between p-2'>
              <a
                className='rounded-md bg-teal-600 py-2 px-2 text-white font-semibold tracking-wide flex flex-row text-sm hover:bg-teal-700'
                href='https://github.com/joshrudesill/chess2'
                rel='noreferrer'
                target='_blank'
              >
                <MarkGithubIcon
                  verticalAlign='middle'
                  size={16}
                  className='my-auto mr-2'
                />
                <p className='my-auto'>Source</p>
              </a>
              <div
                className='rounded-md bg-teal-600 py-2 px-2 text-white font-semibold tracking-wide flex flex-row text-sm hover:bg-teal-700 cursor-pointer'
                onClick={() => router.push("/contact")}
              >
                <SmileyIcon
                  verticalAlign='middle'
                  size={16}
                  className='my-auto mr-2'
                />
                <p className='my-auto'>Contact Me</p>
              </div>
              <a
                className='rounded-md bg-teal-600 py-2 px-2 text-white font-semibold tracking-wide flex flex-row text-sm hover:bg-teal-700'
                href='https://blog.jrudesill.dev'
                rel='noreferrer'
                target='_blank'
              >
                <CodeReviewIcon
                  verticalAlign='middle'
                  size={16}
                  className='my-auto mr-2'
                />
                <p className='my-auto'>Blog</p>
              </a>
              <a
                className='rounded-md bg-teal-600 py-2 px-2 text-white font-semibold tracking-wide flex flex-row text-sm hover:bg-teal-700'
                href='https://jrudesill.dev'
                rel='noreferrer'
                target='_blank'
              >
                <LogIcon
                  verticalAlign='middle'
                  size={16}
                  className='my-auto mr-2'
                />
                <p className='my-auto'>Resume</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
