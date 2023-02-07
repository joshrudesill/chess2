import {
  FlagIcon,
  HandThumbUpIcon,
  TrophyIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
const Sidebar = () => {
  return (
    <div className='hidden md:flex flex-col w-36 bg-neutral-800 h-screen left-0'>
      <div className='w-36 flex-initial flex hover:bg-neutral-500 p-3'>asd</div>
      <div className='w-36 inline-flex hover:bg-neutral-500 p-3 font-semibold text-white hover:skew-y-3 cursor-pointer text-md'>
        <TrophyIcon className='h-6 w-6 mt-0.5 mr-2 text-green-500 ' />
        Play
      </div>
      <div className='w-36 inline-flex hover:bg-neutral-500 p-3 font-semibold text-white hover:skew-y-3 cursor-pointer text-md'>
        <InformationCircleIcon className='h-6 w-6 mt-0.5 mr-2 text-blue-400 ' />
        More Info
      </div>
      <div className='w-36 inline-flex hover:bg-neutral-500 p-3 font-semibold text-white hover:skew-y-3 cursor-pointer text-md mt-auto'>
        <InformationCircleIcon className='h-6 w-6 mt-0.5 mr-2 text-blue-400 ' />
        More Info
      </div>
    </div>
  );
};

export default Sidebar;
