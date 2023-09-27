'use client'
import { combineReducers } from "@reduxjs/toolkit"
import counterReducer from './slices/counter'
import authReducer from './slices/auth'
import loaderReducer from './slices/loader'
import channelReducer from './slices/channel'
import videoReducer from './slices/videoDetails'
import videoEditReducer from './slices/video'
const rootReducers = combineReducers({
    count: counterReducer,
    loader: loaderReducer,
    auth: authReducer,
    channel: channelReducer,
    video: videoReducer,
    videoEdit: videoEditReducer,
})
export default rootReducers