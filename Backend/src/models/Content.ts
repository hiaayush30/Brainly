import mongoose, { Document, Types } from "mongoose";
import { User } from "./User";

interface ContentType extends Document{
    title:string,
    link:string,
    type:string,
    tags:Array<Types.ObjectId>
    userId:Types.ObjectId
}

const contentSchema = new mongoose.Schema<ContentType>({
    title:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:['document','tweet','youtube','link']
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tag'
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
},{timestamps:true})

contentSchema.pre('save',async function (next) {
    const user = await User.findById(this.userId);
    if(!user){
        throw new Error('user does not exist');
    }
    else{
        next();
    }
})

const Content = mongoose.model<ContentType>('Content',contentSchema);
export default Content;