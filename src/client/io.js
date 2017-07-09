import IO from "socket.io-client";

export const socket = IO("http://localhost:3001");

socket.on("disconnect",()=>{
	console.log("user disconnect");
})