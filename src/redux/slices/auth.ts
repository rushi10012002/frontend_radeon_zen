'use client'

import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    auth: false,
    user: null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state: any, action: any) => {
            state.auth = true
            state.user = action.payload
        },
        logout: (state) => {
            state.auth = false
            state.user = null

        },

    }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer