import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import cartReducer from './cartSlice'
import uiReducer from "./ui-Slice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        cartItems:cartReducer,
        modalUi:uiReducer
    }
});


export default store;
