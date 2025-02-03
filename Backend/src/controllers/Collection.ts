import { Request, Response } from "express";
import Collection from "../models/Collection";
import zod, { string } from 'zod';
import { triggerAsyncId } from "async_hooks";
import Content from "../models/Content";

export const addCollection = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: 'invalid request'
            })
        }
        const collection = await Collection.findOne({
            name,
            userId: req.user?._id
        })
        if (collection) {
            return res.status(403).json({
                message: 'duplcate collections cannot exist'
            })
        }
        await Collection.create({
            name,
            userId: req.user?._id
        })
        return res.status(201).json({
            message: 'Collection created successfully'
        })
    } catch (error) {
        console.log('error in creating collection ' + error)
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}

const addCollectionSchema = zod.object({
    collectionId:zod.string(),
    content:zod.string(),
})
export const addContentToCollection = async (req:Request,res:Response):Promise<any>=>{
    const validBody = addCollectionSchema.safeParse(req.body)
    if(!validBody.success){
        return res.status(403).json({
            message:'invalid request',
            error:validBody.error.format()
        })
    }
    const {collectionId,content}= req.body;
    try {
        const post = await Content.find({
            _id:content
        });
        if(!post){
            return res.status(400).json({
                message:'content not found'
            })
        }
        const collection = await Collection.findOne({
            _id:collectionId,
            userId:req.user?._id
        })
        if(!collection){
            return res.status(400).json({
                mesage:'collection not found'
            })
        }
        //remove id if already present
        if(collection.content.some(id=>id.equals(content))){
            collection.content=collection.content.filter(id=>!id.equals(content))
            await collection.save();
            return res.status(200).json({
                message:'content deleted'
            })
        }else{
            collection.content.push(content);
            await collection.save();
            return res.status(200).json({
                message:'content added'
            })
        }
    } catch (error) {
        console.log('error in adding content to collection: '+error)
        return res.status(500).json({
            message:'internal server error'
        })
    }
}

export const getCollection=async(req:Request,res:Response):Promise<any>=>{
    try {
        const collections =await Collection.find({
            userId:req.user?._id
        })
        .populate({
            path:'content',
            populate:[
                {path:'tags'},
                {path:'userId',select:'-password'}
            ]
        })
        return res.status(200).json({
            message:'collections fetched successfully',
            collections
        })
    } catch (error) {
        console.log('error in getting collections: '+error)
        return res.status(500).json({
            message:'internal server error'
        })
    }
}