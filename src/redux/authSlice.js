import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null
    },
    reducers: {
        login: (state, action)=>{
            state.isAuthenticated = true,
            state.user = action.payload
        },
        logOut: (state, action)=> {
            state.isAuthenticated = false,
            state.user = null
        }
    }
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;