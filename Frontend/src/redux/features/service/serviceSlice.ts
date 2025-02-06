import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ServiceState {
    darkMode: boolean,
    openAddContent: boolean,
    openShareBrain: boolean,
    openAddCollection: boolean;
    me: {
        username: string;
    } | null
}

const initialState: ServiceState = {
    darkMode: true,
    openAddContent: false,
    openShareBrain: false,
    me: null,
    openAddCollection: false,
}

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        addMeInfo: (state, action: PayloadAction<string>) => {
            state.me = {
                username: action.payload
            }
        },
        toggleTheme: (state,action:PayloadAction<boolean>) => {
            if(action.payload){
                document.body.classList.add('dark');
            }else{
                document.body.classList.remove('dark');
            }
            localStorage.setItem('darkMode',JSON.stringify(action.payload));
            state.darkMode = action.payload;
        },
        toggleAddContent: (state, action: PayloadAction<boolean>) => {
            state.openAddContent = action.payload
        },
        toggleShareBrain: (state, action: PayloadAction<boolean>) => {
            state.openShareBrain = action.payload;
        },
        toggleAddCollection: (state, action: PayloadAction<boolean>) => {
            state.openAddCollection = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function   
export const { toggleAddContent, toggleAddCollection, toggleShareBrain, toggleTheme, addMeInfo } = serviceSlice.actions

export default serviceSlice.reducer