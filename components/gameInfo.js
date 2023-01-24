import {
  FlagIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/20/solid";
import { Tooltip } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import Chat from "./chat";
import Notation from "./notation";
import TakenPiece from "./takenPiece";
const GameInfo = ({ myTimer, oppTimer }) => {
  const dispatch = useDispatch();
  const [drawRequest, setDrawRequest] = useState(false);
  const myTurn = useSelector((state) => state.board.myTurn);
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
  return (
    <div className='lg:w-[30vw] w-11/12 border rounded-md border-neutral-600 divide-neutral-600 shadow-lg flex flex-col divide-y  text-white mx-auto md:mx-0 lg:mt-8 lg:mr-2'>
      <div className='flex justify-between p-2 text-black'>
        {myTurn ? (
          <>
            <p className='font-mono md:text-2xl lg:text-2xl border bg-white rounded-lg px-2'>
              {myTimer.formattedTime}
            </p>
            <p className='font-mono md:text-2xl rounded-lg text-gray-500 bg-neutral-400 lg:text-2xl px-2'>
              {oppTimer.formattedTime}
            </p>
          </>
        ) : (
          <>
            <p className='font-mono md:text-2xl rounded-lg text-gray-500 bg-neutral-400 lg:text-2xl px-2'>
              {myTimer.formattedTime}
            </p>
            <p className='font-mono md:text-2xl lg:text-2xl bg-white rounded-lg px-2 '>
              {oppTimer.formattedTime}
            </p>
          </>
        )}
      </div>
      <div className='flex flex-col p-2'>
        <div className='flex flex-row justify-center text-xs'>
          <p className='font-sans xl:text-lg '>{session.username}</p>
          <p className='font-mono xl:text-xl grow text-center'>VS</p>
          <p className='font-sans xl:text-lg'>{oData.username}</p>
        </div>
        <div className='flex flex-row justify-between text-xs'>
          <div>
            {takenPieces.length > 0 ? (
              takenPieces.map((t) => {
                if (t.white !== white && white !== null) {
                  return <TakenPiece white={t.white} type={t.type} />;
                }
              })
            ) : (
              <div style={{ height: "15px" }}></div>
            )}
          </div>
          <div>
            {takenPieces.map((t) => {
              if (t.white === white && white !== null) {
                return <TakenPiece white={t.white} type={t.type} />;
              }
            })}
          </div>
        </div>
      </div>
      <div className='flex h-[40%] content-start flex-wrap flex-row text-xs p-2 gap-3 overflow-y-scroll'>
        {debugMode ? (
          <>
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
            <div className='flex bg-neutral-700 w-full p-1 justify-between'>
              <div>King</div>
              <div>{king ? "True" : "False"}</div>
            </div>
          </>
        ) : (
          <Notation />
        )}
      </div>

      <div className='flex flex-row flex-wrap p-1'>
        <button
          type='button'
          className='inline-flex border-2 border-red-700 font-medium rounded-lg text-xs px-2 py-2 text-center mx-1 my-2'
          onClick={resign}
        >
          Resign
          <FlagIcon className='h-4 w-4 text-white ml-2' />
        </button>
        {drawRequest ? (
          <>
            <button
              type='button'
              className='inline-flex hover:text-white border-2 border-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-xs px-2 py-2 text-center mx-1 my-2'
              onClick={draw}
            >
              Yes
              <HandThumbUpIcon className='h-4 w-4 text-white ml-2' />
            </button>
            <button
              type='button'
              className='inline-flex hover:text-white border-2 border-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-xs px-2 py-2 text-center mx-1 my-2'
              onClick={() => setDrawRequest(false)}
            >
              No
              <HandThumbDownIcon className='h-4 w-4 text-white ml-2' />
            </button>
            <p className='my-auto ml-1'>Confirm Draw?</p>
          </>
        ) : (
          <Tooltip content='EX' style='light' className='text-xs'>
            <button
              type='button'
              className='inline-flex border-2 border-yellow-500 font-medium rounded-lg text-xs px-2 py-2 text-center mx-1 my-2'
              onClick={() => socket.emit("requestDraw")}
            >
              Draw
              <HandThumbUpIcon className='h-4 w-4 text-white ml-2' />
            </button>
          </Tooltip>
        )}
        <button
          onClick={() => setDebugMode(!debugMode)}
          className='inline-flex border-2 border-yellow-500 font-medium rounded-lg text-xs px-2 py-2 text-center mx-1 my-2'
        >
          Debug Mode
        </button>
      </div>
      <Chat chat={chat} />
      <div className='flex p-2'>
        <p className='font-mono text-s lg:text-lg underline '>Variant name</p>
      </div>
    </div>
  );
};

export default GameInfo;
