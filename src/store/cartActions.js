import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cartAction } from './cartSlice';

export const sendCartdata = (cartData)=>{
    return async (dispatch) => {
        const localId = localStorage.getItem('localId');
            try {
                toast.info('Pending...sending cart data..',{
                  autoClose: 1000
                })
                const response = await fetch(`https://ecommerce-5696a-default-rtdb.firebaseio.com/cart/${localId}.json`,{
                  method:'PUT',
                  body:JSON.stringify({Items:cartData.items,totalAmount:cartData.totalAmount}),
                  headers: {
                    'Content-Type': 'application/json'
                }
                });
                if(!response.ok){
                    throw new Error('Error!..check again cart items not added');
                 }
          
              
                toast.success('Successfully send cart data',{
                  autoClose: 1000
                })
              } catch (error) {
                console.log(error);
                toast.error(error.message,{
                  autoClose: 1000
                });
              }
        }
        
      
}


export const fetchCartData = () => {
    return async (dispatch) => {
        const localid = localStorage.getItem('localId');

        try {
            const response = await fetch(`https://ecommerce-5696a-default-rtdb.firebaseio.com/cart/${localid}.json`);
            if (!response.ok) {
                throw new Error('Fetching cart error, please check again');
            }
            const data = await response.json();
            console.log(data);
            dispatch(cartAction.replaceCart(data))
      


    } catch (error) {
      console.log(error);
    }
  }
}






// export const addCartdata = (cartData)=>{
//     return async (dispatch) => {
//         const localId = localStorage.getItem('localId');
//             try {
//                 toast.info('Pending...sending cart data..',{
//                   autoClose: 1000
//                 })
//                 const response = await fetch(`https://ecommerce-5696a-default-rtdb.firebaseio.com/cart/${localId}.json`,{
//                   method:'PUT',
//                   body:JSON.stringify(cartData),
//                   headers: {
//                     'Content-Type': 'application/json'
//                 }
//                 });
//                 if(!response.ok){
//                     throw new Error('Error!..check again cart items not added');
//                  }
          
//                 dispatch(cartAction.addItems(cartData))
//                 toast.success('Successfully send cart data',{
//                   autoClose: 1000
//                 })
//               } catch (error) {
//                 console.log(error);
//                 toast.error(error.message,{
//                   autoClose: 1000
//                 });
//               }
//         }
        
      
// }
