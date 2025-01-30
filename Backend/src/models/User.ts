import mongoose, { mongo } from "mongoose";

type user = {
    username: string;
    password: string;
}

const userSchema = new mongoose.Schema<user>({
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

const User = mongoose.model<user>('user',userSchema);
export {User};