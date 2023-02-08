import { TrophyIcon } from "@heroicons/react/20/solid";
import {
  MarkGithubIcon,
  SmileyIcon,
  CodeReviewIcon,
  LogIcon,
} from "@primer/octicons-react";
const Sidebar = () => {
  return (
    <div className='hidden md:flex flex-col w-36 bg-neutral-800 h-screen left-0 px-2 pt-3 justify-start'>
      <div className='flex flex-row  text-white cursor-pointer text-lg hover:bg-lime-500 rounded-lg p-3  '>
        <TrophyIcon className='h-6 w-6 mt-0.5 mr-2 ' />
        Home
      </div>
      <div className='flex flex-row  text-white cursor-pointer text-lg hover:bg-lime-500 rounded-lg p-3'>
        <MarkGithubIcon size={24} className='mr-3' />
        Source
      </div>
      <div className='flex flex-row  text-white cursor-pointer text-lg hover:bg-lime-500 rounded-lg p-3'>
        <LogIcon size={24} className='mr-3' />
        Resume
      </div>
      <div className='flex flex-row  text-white cursor-pointer text-lg hover:bg-lime-500 rounded-lg p-3'>
        <CodeReviewIcon size={24} className='mr-3' />
        Blog
      </div>
      <div className='flex flex-row  text-white cursor-pointer text-lg hover:bg-lime-500 rounded-lg p-3'>
        <SmileyIcon size={24} className='mr-3' />
        Contact
      </div>
    </div>
  );
};

export default Sidebar;
