import CartModal from "./CartModal";
import { Button, Modal } from "react-bootstrap";
import classes from './Cart.module.css';
import { cartAction } from "../../store/cartSlice";
import { useSelector,useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-Slice";




// const cartElements = [

//     {
    
//     title: 'Album 1',
    
//     price: 100,
    
//     imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    
//     quantity: 2,
    
//     },
    
//     {
    
//     title: 'Album 2',
    
//     price: 50,
    
//     imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    
//     quantity: 3,
    
//     },
    
//     {
    
//     title: 'Album 3',
    
//     price: 70,
    
//     imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    
//     quantity: 1,
    
//     } ,

//     {
    
//         title: 'Album 4',
        
//         price: 70,
        
//         imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
        
//         quantity: 1,
        
//         },

//         {
    
//             title: 'Album 5',
            
//             price: 70,
            
//             imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
            
//             quantity: 1,
            
//             },


//             {
    
//                 title: 'Album 6',
                
//                 price: 70,
                
//                 imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
                
//                 quantity: 1,
                
//                 },


//                 {
    
//                     title: 'Album 7',
                    
//                     price: 70,
                    
//                     imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
                    
//                     quantity: 1,
                    
//                     },

//                     {
    
//                         title: 'Album 8',
                        
//                         price: 70,
                        
//                         imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
                        
//                         quantity: 1,
                        
//                         }
    
//     ]

const Cart = (props) => {
    const dispatch = useDispatch();
    const items = useSelector((state)=>state.cartItems.items);
    const total = useSelector((state)=>state.cartItems.totalAmount);

    console.log(items)


    const totalAmount =  `$${total.toFixed(2)}`;
    const hasItems = items.length>0;

    const cartItemRemoveHandler = (id) => {
       dispatch(cartAction.removeItem({id}))
    }

    const cartItemAddHandler = item =>{
        dispatch(cartAction.addItems(item))
    }


       const cartList = (<ul className={classes['cart-item']}>
       
      {items.map(item => <CartModal
        key={item.key}
        id ={item.id}
        title={item.title}
        imageUrl={item.imageurl}
        price={item.price}
        totalamount={item.totalprice}
        quantity={item.amount}
        onRemove={cartItemRemoveHandler.bind(null,item.id)}
        onAdd={cartItemAddHandler.bind(null,item)}
    
    />)}
        
        </ul>);
       


        return (
            <Modal show={()=>dispatch(uiAction.toogle())} onHide={()=>dispatch(uiAction.toogle())}>
            <Modal.Header closeButton>
                <Modal.Title className={`${classes['modal-title']}`}>Cart</Modal.Title>

            </Modal.Header> 
            <Modal.Body>
                {cartList}
                <div className="m-1 p-1 fs-3 fw-bold d-flex flex-row-reverse gap-4">
                    <span>{totalAmount}</span>
                    <span> Total Amount</span>
                </div>
            
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={()=>dispatch(uiAction.toogle())}>Close</Button>
                {hasItems &&<Button variant='primary'>Purchase</Button>} 
            </Modal.Footer>
        </Modal>

        )
       
};

export default Cart;