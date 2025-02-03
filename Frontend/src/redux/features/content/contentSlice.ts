import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Content {
    _id:string,
    type:'document'|'tweet'|'youtube'|'link';
    link:string;
    title:string;
    createdAt:Date,
    tags:Array<{
        _id:string;
        title:string;
    }>,
    userId:{
        _id:string;
        username:string;
    }
}

const initialState: Array<Content> = []

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        addContent:(state,action:PayloadAction<Content>)=>{
            const set= new Set();
            state.forEach((content)=>{
                set.add(content._id);
            }) 
            if(set.has(action.payload._id)) return;
            state.push(action.payload);
        },
        setContent:(state,action:PayloadAction<Array<Content>>)=>{
            const set= new Set();
            state.forEach((content)=>{
                set.add(content._id);
            }) 
            action.payload.forEach(content=>{
                if(set.has(content._id)) return;
                state.push(content);
            })
        },
        deleteContent:(state,action:PayloadAction<string>)=>{
            return state.filter(content=>{
                return content._id !== action.payload
            })
        }
    },
})

// Action creators are generated for each case reducer function   
export const { addContent,setContent,deleteContent } = contentSlice.actions

export default contentSlice.reducer