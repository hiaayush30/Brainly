import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDb from './config/db';
import { FE_DOMAIN, PORT } from './constants/env';

const app = express();
app.use(cors({
    origin: FE_DOMAIN,
    credentials: true
}))
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'we are on'
    })
})

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log('server running on ' + PORT);
        })
    })