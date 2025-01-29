import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('connected to db');
    } catch (error) {
        console.error('error connecting to db:' + error);
    }
}

export default connectDb;