import mongoose, { Document, mongo } from "mongoose";
import { title } from "process";

interface TagType extends Document{
    title:string
}

const tagSchema = new mongoose.Schema<TagType>({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    }
})

const Tag = mongoose.model<TagType>('Tag',tagSchema);
export default Tag;