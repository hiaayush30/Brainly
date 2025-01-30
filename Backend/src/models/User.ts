import mongoose, { Document, Types } from "mongoose";

interface UserType extends Document {
    username: string;
    password: string;
}


const userSchema = new mongoose.Schema<UserType>({
     username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3,
        maxlength:10
     },
     password:{
        required:true,
        type:String,
        minlength:8,
        trim:true
     }
})

const User = mongoose.model<UserType>('User',userSchema);
export {User};