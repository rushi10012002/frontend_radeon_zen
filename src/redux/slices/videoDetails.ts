'use client'
import { getVideoTypePost } from "@/services/getCall";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    video: "",
    videoListData: {
        videos: {
            data: []
        }
    }
}
export const videoListType: any = createAsyncThunk("videoList/type", async (data: { page: number, type: string }) => {
    const response = await getVideoTypePost(data.page, data.type)
    return response.data.data
})

const videoSlice = createSlice({
    name: "videoDetails",
    initialState,
    reducers: {
        video: (state: any, action) => {
            state.video = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(videoListType.fulfilled, (state, action) => {
            const fullState = action.payload
            console.log("fullState==>", fullState);

            state.videoListData = action.payload

        })

    }
})
export const { video } = videoSlice.actions;
export default videoSlice.reducer