import { TrophyIcon } from "@heroicons/react/20/solid";
import {
  MarkGithubIcon,
  SmileyIcon,
  CodeReviewIcon,
  LogIcon,
} from "@primer/octicons-react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { endGame, setMyTurn } from "../features/app/appSlice";
import { resetAll, setLastMove } from "../features/board/boardSlice";
import socket from "../socket";
const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className='fixed hidden md:flex flex-col w-36 bg-neutral-800 h-screen left-0 px-2 pt-3 justify-start'>
      <div
        className='flex flex-row  text-white cursor-pointer text-lg hover:bg-lime-500 rounded-lg p-3 '
        onClick={() => {
          socket.emit("endGame", "resignation");
          dispatch(setMyTurn(false));
          dispatch(setLastMove([-1, -1, -1, -1]));
          dispatch(resetAll());
          dispatch(endGame());
          router.push("/");
        }}
      >
        <TrophyIcon className='h-6 w-6 mt-0.5 mr-2 ' />
        Home
      </div>
      <a
        className='flex flex-row  text-white cursor-pointer text-lg hover:bg-lime-500 rounded-lg p-3'
        href='https://github.com/joshrudesill/chess2'
        target='_blank'
        rel='noreferrer'
      >
        <MarkGithubIcon size={24} className='mr-3' />
        Source
      </a>
      <a
        className='flex flex-row  text-white cursor-pointer text-lg hover:bg-lime-500 rounded-lg p-3'
        href='https://jrudesill.dev'
        target='_blank'
        rel='noreferrer'
      >
        <LogIcon size={24} className='mr-3' />
        Resume
      </a>
      <a
        className='flex flex-row  text-white cursor-pointer text-lg hover:bg-lime-500 rounded-lg p-3'
        href='https://blog.jrudesill.dev'
        target='_blank'
        rel='noreferrer'
      >
        <CodeReviewIcon size={24} className='mr-3' />
        Blog
      </a>
      <div className='flex flex-row  text-white cursor-pointer text-lg hover:bg-lime-500 rounded-lg p-3'>
        <SmileyIcon size={24} className='mr-3' />
        Contact
      </div>
    </div>
  );
};

export default Sidebar;
