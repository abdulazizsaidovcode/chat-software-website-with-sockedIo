import express from 'express'
import { register, login, setAvatar, getAllUsers } from '../controllers/usersController.js';

const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/setAvatar/:id", setAvatar);
userRouter.get("/allUsers/:id", getAllUsers)

export default userRouter;