import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name:'ui',
    initialState:{CartIsVisible:false,notification:null},
    reducers:{
        toogle(state){
            state.CartIsVisible = !state.CartIsVisible 
        },
        showNotification(state,action){
            state.notification = {
                status:action.payload.status,
                title:action.payload.title,
                message:action.payload.message
            }
        }
    }
});



export default uiSlice.reducer;
export const uiAction = uiSlice.actions;