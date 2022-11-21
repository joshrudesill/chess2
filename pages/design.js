import { useEffect, useState } from "react";
import useScreenSize from "../util/usescreensize";

/* eslint-disable react/jsx-key */
const Design = () => {
  const a = Array.from(Array(8).keys());
  const [boardSize, setBoardSize] = useState("");
  const { height, width } = useScreenSize();
  useEffect(() => {
    if (height > width * 0.65) {
      setBoardSize("w-1/2");
    } else {
      setBoardSize("h-[95%]");
    }
  }, [height, width]);
  return (
    <div className="">
      <div className="container mx-3 px-4">
        <div className="flex flex-row gap-3 justify-end h-screen p-3">
          <div className={`${boardSize} aspect-square`}>
            <div className="grid grid-cols-8 grid-rows-8">
              {a.map((j) => {
                return a.map((e) => (
                  <div
                    className={`aspect-square  ${
                      j % 2 === 0
                        ? e % 2 === 0
                          ? "bg-emerald-800"
                          : "bg-stone-400"
                        : e % 2 !== 0
                        ? "bg-emerald-800 "
                        : "bg-stone-400"
                    }`}
                  ></div>
                ));
              })}
            </div>
          </div>
          <div className="border w-2/5  rounded-md border-neutral-600 divide-neutral-600 shadow-lg flex flex-col divide-y p-1 text-white">
            <div className="flex justify-between p-2">
              <p className="font-mono text-5xl">10:00</p>
              <p className="font-mono text-5xl text-neutral-400">10:00</p>
            </div>
            <div className="flex flex-row justify-center gap-x-1 p-2 ">
              <p className="font-sans text-xl ">Player1</p>
              <p className="font-mono text-1xl grow text-center">VS</p>
              <p className="font-sans text-xl">Player2</p>
            </div>
            <div className="flex grow flex-row p-2 flex-wrap content-start text-xs">
              <div className="flex m-1 bg-neutral-700 p-2 rounded">1. asdf</div>
              <div className="flex m-1 bg-neutral-700 p-2 rounded">1. asdf</div>
              <div className="flex m-1 bg-neutral-700 p-2 rounded">1. asdf</div>
              <div className="flex m-1 bg-neutral-700 p-2 rounded">1. asdf</div>
              <div className="flex m-1 bg-neutral-700 p-2 rounded">1. asdf</div>
              <div className="flex m-1 bg-neutral-700 p-2 rounded">1. asdf</div>
              <div className="flex m-1 bg-neutral-700 p-2 rounded">1. asdf</div>
              <div className="flex m-1 bg-neutral-700 p-2 rounded">1. asdf</div>
              <div className="flex m-1 bg-neutral-700 p-2 rounded">1. asdf</div>
              <div className="flex m-1 bg-neutral-700 p-2 rounded">1. asdf</div>
            </div>
            <div className="flex p-2">
              <p className="font-mono text-xl underline ">Variant name</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Design;
{
  /*<nav class=' border-gray-200 px-2 sm:px-4 py-2 rounded dark:bg-gray-900'>
          <div class='flex flex-wrap items-center justify-between mx-auto'>
            <a href='https://flowbite.com/' class='flex items-center'>
              <Image src={logo1} width='60' height='60' />
              <span class='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                Chess2
              </span>
            </a>
            <button
              data-collapse-toggle='navbar-default'
              type='button'
              class='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-default'
              aria-expanded='false'
            >
              <span class='sr-only'>Open main menu</span>
              <svg
                class='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>
            <div class='hidden w-full md:block md:w-auto' id='navbar-default'>
              <ul class='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                <li>
                  <a
                    href='#'
                    class='block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
                    aria-current='page'
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    class='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    class='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    class='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    class='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>*/
}
