import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/Auth.slice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})