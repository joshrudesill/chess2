import { io } from "socket.IO-client";

const URL = "http://localhost:8080";
const socket = io(URL, { autoConnect: false });

export default socket;
