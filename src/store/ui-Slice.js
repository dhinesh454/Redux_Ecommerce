import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name:'ui',
    initialState:{CartIsVisible:false},
    reducers:{
        toogle(state){
            state.CartIsVisible = !state.CartIsVisible 
        }
    }
});



export default uiSlice.reducer;
export const uiAction = uiSlice.actions;