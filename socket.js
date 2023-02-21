import { io } from "socket.io-client";

//const URL = "https://chess2server.fly.dev";
const URL = "http://localhost:8080";
const socket = io(URL, { autoConnect: false, withCredentials: true });
socket.onAny((event, ...args) => {
  console.log(event, args);
});
socket.onAnyOutgoing((event, ...args) => {
  console.log(event);
});
export default socket;
