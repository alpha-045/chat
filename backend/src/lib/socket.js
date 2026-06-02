import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
});

export function getrecieveSocketId(userId){
    return usersActives[userId]
}
 

const usersActives = {}

io.on("connection",(socket)=> {

    const userId = socket.handshake.query.userId;
    if(userId) usersActives[userId] =  socket.id;

    socket.emit("onlineUsers",Object.keys(usersActives))

    socket.on("disconnect",() => {
    delete  usersActives[userId]
    socket.emit("onlineUsers",Object.keys(usersActives))
    })
})


export {io,app,server}


