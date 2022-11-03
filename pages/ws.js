import { useEffect, useState } from "react";
import socket from "../socket";
const Ws = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const username = "asdf" + Math.floor(Math.random() * 100).toString();
    socket.auth = { username };
    socket.connect();
    socket.on("users", (users) => {
      setUsers(users);
    });
  }, []);
  return (
    <div className='container'>
      <div className='content'>
        {users.map((u) => (
          <div className='p'>{u.username}</div>
        ))}
      </div>
    </div>
  );
};

export default Ws;
