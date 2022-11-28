import { useEffect, useState, useLayoutEffect } from "react";
import useScreenSize from "../util/usescreensize";

const Testing = () => {
  const { width, height } = useScreenSize();
  useLayoutEffect(() => {}, []);
  return (
    <div className='flex flex-row gap-3 border h-screen'>
      <div className='fixed h-screen w-36 bg-red-400'></div>
      <div className='w-[min(90vh,90vw)] bg-green-400 ml-48'>
        <div className='w-full bg-yellow-400'></div>
      </div>
      <div className='w-auto bg-blue-400 text-white'>
        hasdfasdfasdhasdfasdfasdhasdfasdfasdhasdfasdfasd
      </div>
    </div>
  );
};

export default Testing;
