import express from 'express';
import cors from 'cors';
import connectDb from './config/db';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.FE_DOMAIN,
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
        app.listen(process.env.PORT, () => {
            console.log('server running on ' + process.env.PORT);
        })
    })