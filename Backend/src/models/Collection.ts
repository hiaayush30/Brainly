import mongoose, { Document, Types } from "mongoose";

interface CollectionType extends Document {
    name: string;
    content: Array<Types.ObjectId>;
    userId: Types.ObjectId;
}

const collectionSchema = new mongoose.Schema<CollectionType>({
    name: {
        type: String,
        required: true
    },
    content: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Collection = mongoose.model<CollectionType>('Collection', collectionSchema)

export default Collection