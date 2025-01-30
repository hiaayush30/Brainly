import mongoose, { Document, Types } from "mongoose";

interface LinkType extends Document{
    hash:string;
    userId:Types.ObjectId
}

const linkSchema = new mongoose.Schema<LinkType>({
    hash:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Link = mongoose.model<LinkType>('Link',linkSchema);
export default Link;