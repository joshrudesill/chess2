import {
  FlagIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/20/solid";
import { Tooltip } from "flowbite-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import Chat from "./chat";
import Notation from "./notation";
import TakenPiece from "./takenPiece";
const GameInfo = ({ myTimer, oppTimer, engineMode }) => {
  const dispatch = useDispatch();
  const [drawRequest, setDrawRequest] = useState(false);
  const myTurn = useSelector((state) => state.board.myTurn);
  const activePiece = useSelector((state) => state.board.activePiece);
  const pdrag = useSelector((state) => state.board.mouseDragging);
  const startTime = useSelector((state) => state.board.startTime);
  const gameStarted = useSelector((state) => state.app.inGameData.gameStarted);
  const session = useSelector((state) => state.app.sessionDetails);
  const cto = useSelector((state) => state.board.currentTimerOffset);
  const white = useSelector((state) => state.board.white);
  const ping = useSelector((state) => state.app.ping);
  const oData = useSelector((state) => state.app.inGameData.opponentData);
  const king = useSelector((state) => state.board.kingData.inCheck);
  const chat = useSelector((state) => state.board.chat);
  const takenPieces = useSelector((state) => state.board.takenPieces);
  const [debugMode, setDebugMode] = useState(false);
  const resign = useCallback(() => socket.emit("endGame", "resignation"), []);
  const draw = useCallback(() => {
    setDrawRequest(false);
    socket.emit("endGame", "draw");
  }, []);
  useEffect(() => {
    socket.on("drawRequested", () => setDrawRequest(true));
    return () => {
      socket.off("drawRequested");
    };
  });
  const boxRef = useRef(null);
  return (
    <div className='lg:w-[30vw] w-11/12 md:h-[88vmin] border rounded-md border-neutral-600 divide-neutral-600 shadow-lg flex flex-col divide-y text-white mx-auto md:mx-0 lg:mt-8 lg:mr-2'>
      <div className='grid grid-flow-row grid-rows-6 h-3/5 2xl:h-7/12 divide-neutral-600 divide-y'>
        <div className='flex justify-between p-2 text-black row-span-1 h-min my-auto divide-x divide-neutral-600'>
          {engineMode ? (
            <>
              <p className='font-mono md:text-2xl lg:text-3xl border bg-white rounded-lg px-2 align-text-bottom'>
                &infin;
              </p>
              <p className='font-mono md:text-2xl rounded-lg text-gray-500 bg-neutral-400 lg:text-3xl px-2 align-text-bottom'>
                &infin;
              </p>
            </>
          ) : myTurn ? (
            <>
              <p className='font-mono md:text-2xl lg:text-3xl border bg-white rounded-lg px-2 align-text-bottom'>
                {myTimer.formattedTime}
              </p>
              <p className='font-mono md:text-2xl rounded-lg text-gray-500 bg-neutral-400 lg:text-3xl px-2 align-text-bottom'>
                {oppTimer.formattedTime}
              </p>
            </>
          ) : (
            <>
              <p className='font-mono md:text-2xl rounded-lg text-gray-500 bg-neutral-400 lg:text-3xl px-2 align-text-bottom'>
                {myTimer.formattedTime}
              </p>
              <p className='font-mono md:text-2xl lg:text-3xl bg-white rounded-lg px-2 align-text-bottom'>
                {oppTimer.formattedTime}
              </p>
            </>
          )}
        </div>
        <div className='flex flex-col p-2 row-span-1 '>
          <div className='flex flex-row justify-center text-xs'>
            <p className='font-sans xl:text-lg '>{session.username}</p>
            <p className='font-mono xl:text-xl grow text-center'>VS</p>
            <p className='font-sans xl:text-lg'>{oData.username}</p>
          </div>
          <div
            className='flex flex-row justify-between text-xs my-auto h-[50%]'
            ref={boxRef}
          >
            <div>
              {takenPieces?.map((t, i) => {
                if (t.white !== white && white !== null) {
                  return (
                    <TakenPiece
                      key={i}
                      white={t.white}
                      type={t.type}
                      height={boxRef?.current?.clientHeight}
                    />
                  );
                }
              })}
            </div>
            <div>
              {takenPieces.map((t, i) => {
                if (t.white === white && white !== null) {
                  return (
                    <TakenPiece
                      key={i}
                      white={t.white}
                      type={t.type}
                      height={boxRef?.current?.clientHeight}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className='flex content-start flex-wrap flex-row text-xs p-2 gap-3 overflow-y-scroll row-span-4'>
          {debugMode ? (
            <>
              <div className='flex bg-neutral-700 w-full p-1 justify-between'>
                <div>ap</div>
                <div>{activePiece ? "True" : "False"}</div>
              </div>
              <div className='flex bg-neutral-700 w-full p-1 justify-between'>
                <div>pd</div>
                <div>{pdrag ? "True" : "False"}</div>
              </div>
              <div className='flex bg-neutral-700 w-full p-1 justify-between'>
                <div>myTurn</div>
                <div>{myTurn ? "True" : "False"}</div>
              </div>
              <div className='flex w-full p-1 justify-between'>
                <div>StartTime</div>
                <div>{startTime ? JSON.stringify(startTime) : "Not Set"}</div>
              </div>
              <div className='flex bg-neutral-700 w-full p-1 justify-between'>
                <div>GameStarted</div>
                <div>{gameStarted ? "True" : "False"}</div>
              </div>
              <div className='flex bg-neutral-700 w-full p-1 justify-between'>
                <div>CTO</div>
                <div>
                  {cto.white}:{cto.black}
                </div>
              </div>
              <div className='flex bg-neutral-700 w-full p-1 justify-between'>
                <div>White</div>
                <div>{white ? "True" : "False"}</div>
              </div>
              <div className='flex bg-neutral-700 w-full p-1 justify-between'>
                <div>Ping</div>
                <div>{ping}</div>
              </div>
              <div className='flex bg-neutral-700 w-full p-1 justify-between'>
                <div>Opponent Connected</div>
                <div>{oData?.connected ? "True" : "False"}</div>
              </div>
            </>
          ) : (
            <Notation />
          )}
        </div>
      </div>
      <div className='grid grid-flow-row grid-rows-5 h-2/5 2xl:h-5/12 divide-neutral-600 divide-y '>
        <div className='flex flex-row flex-wrap row-span-1 '>
          <button
            type='button'
            className='inline-flex border-b-4 border-red-800 bg-red-600 hover:bg-red-700 font-medium rounded-lg text-xs px-2 text-center mx-1 h-5/6 xl:h-2/3 my-auto place-items-center'
            onClick={resign}
          >
            Resign
            <FlagIcon className='h-4 w-4 text-white ml-2' />
          </button>
          {drawRequest ? (
            <>
              <button
                type='button'
                className='inline-flex border-b-4 border-teal-700 bg-teal-500 hover:bg-teal-600 font-medium rounded-lg text-xs px-2 text-center mx-1 h-5/6 xl:h-2/3 my-auto place-items-center'
                onClick={draw}
              >
                Yes
                <HandThumbUpIcon className='h-4 w-4 text-white ml-2' />
              </button>
              <button
                type='button'
                className='inline-flex border-b-4 border-amber-700 bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-xs px-2 text-center mx-1h-5/6 xl:h-2/3 my-auto place-items-center'
                onClick={() => setDrawRequest(false)}
              >
                No
                <HandThumbDownIcon className='h-4 w-4 text-white ml-2' />
              </button>
              <p className='my-auto ml-1'>Confirm Draw?</p>
            </>
          ) : (
            <button
              type='button'
              className='inline-flex border-b-4 border-yellow-600 bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-xs px-2 text-center mx-1 h-5/6 xl:h-2/3 my-auto place-items-center'
              onClick={() => socket.emit("requestDraw")}
            >
              Draw
              <HandThumbUpIcon className='h-4 w-4 text-white ml-2' />
            </button>
          )}
          <button
            onClick={() => setDebugMode(!debugMode)}
            className='inline-flex border-2 border-green-700 font-medium rounded-lg text-xs px-2 text-center mx-1 h-5/6 xl:h-2/3 my-auto place-items-center'
          >
            Debug Mode
          </button>
        </div>
        <Chat chat={chat} />
      </div>
    </div>
  );
};

export default GameInfo;
