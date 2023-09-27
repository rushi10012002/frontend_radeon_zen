'use client'
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    videoEdit: ""
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        videoEdit: (state: any, action) => {
            state.videoEdit = action.payload
        }
    }
})
export const { videoEdit } = videoSlice.actions;
export default videoSlice.reducer