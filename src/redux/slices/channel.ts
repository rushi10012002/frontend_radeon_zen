'use client'

import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    channel: null
}
const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        channelDetails: (state: any, action: any) => {
            state.channel = action.payload
        },
        logOutChannel: (state: any) => {
            state.channel = initialState
        },

    }
})
export const { channelDetails, logOutChannel } = channelSlice.actions
export default channelSlice.reducer