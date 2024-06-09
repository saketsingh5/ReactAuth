import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import usersSlice from "./usersSlice";

const store = configureStore({
    reducer: {
      auth: authSlice,
      user: usersSlice
    }
})

export default store;