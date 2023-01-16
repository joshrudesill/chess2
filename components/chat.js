import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChatMessage } from "../features/board/boardSlice";
import socket from "../socket";
const Chat = ({ chat }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const session = useSelector((state) => state.app.sessionDetails);
  const sendMessage = () => {
    if (message.length > 0) {
      dispatch(
        addChatMessage({
          message: message,
          sender: {
            username: session.username,
            sessionID: session.sessionID,
          },
          timestamp: dayjs().utc().toISOString(),
        })
      );
      socket.emit("newMessage", message);
      setMessage("");
    }
  };
  return (
    <div className='h-64 flex flex-col'>
      <div className='grow p-2 overflow-scroll overflow-x-hidden flex flex-col-reverse'>
        <div className='flex flex-col text-xs flex-wrap gap-2 '>
          {chat.map((c) => (
            <p>
              <span className='font-bold text-yellow-400 mr-1'>
                {`${c.sender.sessionID}:`}
              </span>
              {c.message}
            </p>
          ))}
        </div>
      </div>

      <input
        className='bg-neutral-600'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></input>
      <button onClick={sendMessage} disabled={message.length < 1}>
        Send
      </button>
    </div>
  );
};
export default Chat;
