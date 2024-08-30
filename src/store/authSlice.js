import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isLoggedIn:false,
    token:'',
    localId:''
};


const authSlice = createSlice({
    name:'Authentication',
    initialState:initialAuthState,
    reducers:{
        loginHandler(state,action){
            state.isLoggedIn=true;
            state.token=action.payload.token;
            state.localId=action.payload.localId;
        },
        logoutHandler(state,action){
            state.isLoggedIn=false;
            state.token='';
            state.localId='';
        }
    }
});

export default authSlice.reducer;

export  const authAction = authSlice.actions