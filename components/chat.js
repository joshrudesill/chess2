import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChatMessage } from "../features/board/boardSlice";
import socket from "../socket";
const Chat = ({ chat }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [messageTimeout, setMessageTimeout] = useState(false);
  const session = useSelector((state) => state.app.sessionDetails);
  const gameStarted = useSelector((state) => state.app.inGameData.gameStarted);
  const sendMessage = () => {
    if (message.length > 0) {
      setMessageTimeout(true);
      dispatch(
        addChatMessage({
          message: message.toString(),
          sender: {
            username: session.username,
            sessionID: session.sessionID,
          },
          timestamp: dayjs().utc().toISOString(),
        })
      );
      socket.emit("newMessage", message);
      setMessage("");
      setTimeout(() => {
        setMessageTimeout(false);
      }, 1000);
    }
  };
  return (
    <div className='h-64 flex flex-col'>
      <div className='grow p-2 overflow-scroll overflow-x-hidden flex flex-col-reverse'>
        <div className='flex flex-col text-xs flex-wrap gap-2 '>
          {chat.map((c, i) => (
            <span key={i + 500} className='break-all'>
              {c.sender.sessionID === session.sessionID ? (
                <span className='font-bold text-yellow-400 mr-1'>
                  {`${c.sender.username}:`}
                </span>
              ) : (
                <span className='font-bold text-white mr-1'>
                  {`${c.sender.username}:`}
                </span>
              )}
              {c.message}
            </span>
          ))}
        </div>
      </div>
      <div className='flex flex-row gap-1'>
        <input
          className='bg-neutral-600 p-1 rounded-tr-md flex-grow focus:outline-none '
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          disabled={!gameStarted}
          maxLength={255}
        ></input>
        <button
          onClick={sendMessage}
          disabled={message.length < 1 || !gameStarted || messageTimeout}
          className=' rounded-tl-md bg-blue-600 flex px-5 py-2'
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;
