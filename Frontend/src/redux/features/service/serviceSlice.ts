import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ServiceState {
    darkMode: boolean,
    openAddContent: boolean,
    openShareBrain: boolean,
    me: {
        username: string;
    } | null
}

const initialState: ServiceState = {
    darkMode: false,
    openAddContent: false,
    openShareBrain: false,
    me:null
}

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        addMeInfo:(state,action:PayloadAction<string>)=>{
            state.me={
                username:action.payload
            }
        },
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
        },
        toggleAddContent: (state, action: PayloadAction<boolean>) => {
            state.openAddContent = action.payload
        },
        toggleShareBrain: (state, action: PayloadAction<boolean>) => {
            state.openShareBrain = action.payload
        },

    },
})

// Action creators are generated for each case reducer function   
export const { toggleAddContent, toggleShareBrain, toggleTheme , addMeInfo } = serviceSlice.actions

export default serviceSlice.reducer