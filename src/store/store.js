import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authenticate/authSlice"
// import { composeWithDevTools } from 'redux-devtools-extension';
const store = configureStore({
    reducer: {
        auth: authReducer,
    }, 
});

export default store;
