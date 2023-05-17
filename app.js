import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser';
import { errorMiddleware } from "./middlewares/error.js";
import cors from 'cors';
export const app = express();

config({
    path:"./data/config.env",
})


//Using MiddleWare
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTENDURL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))


app.use("/users",userRouter);
app.use("/task",taskRouter);
app.get("/",(req,res) =>
{
    res.send("Nice Working");
});




// Using Error Middleware
app.use(errorMiddleware);