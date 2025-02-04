import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Content } from '../content/contentSlice';

export interface Collection {
    _id:string,
    name:string;
    content:Array<Content>
    userId:string;
}

const initialState:Array<Collection> = []

export const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        addCollection:(state,action:PayloadAction<Collection>)=>{
            const set= new Set();
            state.forEach((collecton)=>{
                set.add(collecton._id);
            }) 
            if(set.has(action.payload._id)) return;
            state.push(action.payload);
        },
        setCollection:(state,action:PayloadAction<Array<Collection>>)=>{
            const set= new Set();
            state.forEach((collection)=>{
                set.add(collection._id);
            }) 
            action.payload.forEach(collection=>{
                if(set.has(collection._id)) return;
                state.push(collection);
            })
        },
        deleteCollection:(state,action:PayloadAction<string>)=>{
            return state.filter(collection=>{
                return collection._id !== action.payload
            })
        },
        addContentToCollection:(state,action:PayloadAction<{collectionId:string,content:Content}>)=>{
            state.forEach((collection)=>{
                if(collection._id==action.payload.collectionId){
                    collection.content.push(action.payload.content)
                }
            })
        },
        removeContentFromCollection:(state,action:PayloadAction<{collectionId:string,contentId:string}>)=>{
            state.forEach((collection)=>{
                if(collection._id==action.payload.collectionId){
                    collection.content=collection.content.filter(content=>content._id!=action.payload.contentId);
                }
            })
        }
    },
})

// Action creators are generated for each case reducer function   
export const { addCollection,removeContentFromCollection, addContentToCollection, deleteCollection,setCollection } = collectionSlice.actions

export default collectionSlice.reducer