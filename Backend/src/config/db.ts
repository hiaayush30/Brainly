import mongoose from "mongoose";

const connectDb = async () => {
    try {
        if (!process.env.MONGO_URI) {
            return console.error('MONGO_URI not found');
        }
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('connected to db');
    } catch (error) {
        console.error('error connecting to db:' + error);
    }
}

export default connectDb;