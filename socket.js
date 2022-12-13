import { io } from "socket.io-client";

const URL = "https://chess2server.fly.dev";
const socket = io(URL, { autoConnect: false });
socket.onAny((event, ...args) => {
  console.log(event, args);
});
export default socket;
