import express from 'express'
import { addMessage,getAllMessages} from '../controllers/messageController.js';

const messageRouter=express.Router();
messageRouter.post("/addMessage/",addMessage);
messageRouter.post("/getAllMessages",getAllMessages)
export default messageRouter;