import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDb from './config/db';
import { FE_DOMAIN, PORT } from './constants/env';
import userRouter from './routes/user';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin: FE_DOMAIN,
    credentials: true 
}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1',userRouter);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log('server running on ' + PORT);
        })
    })