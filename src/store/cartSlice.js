import { createSlice } from "@reduxjs/toolkit";


const initialCartState = {
    items:[],
    totalAmount:0,
    cartChanged:false
}



const cartSlice = createSlice({
    name:'CartItems',
    initialState:initialCartState,
    reducers:{
        replaceCart  (state,action){
            state.totalAmount = action.payload.totalAmount;
            state.items = action.payload.Items;
        },
        addItems(state,action){
            const cartItemIndex = state.items.findIndex ((item)=>item.id===action.payload.id);
            const existingCartItem = state.items[cartItemIndex]
            if(existingCartItem){
                // let updatedcartItem = {
                //     ...existingCartItem,
                //     amount : existingCartItem.amount + 1
                // }

                // const newCartItem = [
                //     ...state.items
                // ]
                
                // newCartItem[cartItemIndex]=updatedcartItem;
                // state.items=newCartItem;
                existingCartItem.amount++;
                existingCartItem.totalprice = existingCartItem.totalprice + action.payload.price;
                state.totalAmount=action.payload.price+state.totalAmount;
               
            }

            else{
                // state.items = [...state.items,action.payload];
                state.items.push(action.payload);
                state.totalAmount = state.totalAmount + (action.payload.price * action.payload.amount)
            }

        },
        removeItem(state,action){
        
                const cartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
                const existingCartItem = state.items[cartItemIndex];
                
            
                const updatedTotalAmount = state.totalAmount - existingCartItem.price;
       
            
                if (existingCartItem.amount === 1) {
                    // Remove the item from the cart if its amount is 1
                    state.items = state.items.filter((item) => item.id !== action.payload.id);
                } else {
                    // Otherwise, decrease the amount of the existing item   
                    existingCartItem.amount -= 1;
                    existingCartItem.totalprice -=existingCartItem.price;
                }
            
             
                state.totalAmount = updatedTotalAmount;
            }
            
        
    }
});





export default cartSlice.reducer

export const cartAction = cartSlice.actions;
