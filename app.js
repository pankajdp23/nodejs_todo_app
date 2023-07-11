
import express from 'express';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.js';
import taskRoute from './routes/task.js';
import { config } from 'dotenv';
import { errorMiddleware } from './middleware/error.js';
import cors from "cors";

config({
    path: './data/config.env'
})
export const app = express();

//Using Middlware
app.use(cookieParser());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));

//using Routes
app.use('/api/v1/users',userRoute);
app.use('/api/v1/task',taskRoute);

//using Error Middleware
app.use(errorMiddleware);

