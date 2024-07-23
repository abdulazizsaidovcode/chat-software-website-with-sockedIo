import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import messageRouter from './routes/messageRoutes.js';
import userRouter from './routes/userRoutes.js';
import {Server} from 'socket.io';
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter)
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB connected successfully")
}).catch((err)=>{
    console.log(err)
})
const server = app.listen(process.env.PORT, () => {
    console.log(`Server stated on port ${process.env.PORT}`);
})
const io=new Server(server,{
    cors:{
        origin:"https://rockys-chat-app.netlify.app"
    },
    credentials:true
})

global.onlineUsers=new Map()
io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    })
    
})