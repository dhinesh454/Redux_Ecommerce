
import { Button ,Card} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartAction } from "../../store/cartSlice";


const Productlist = (props) => {
   const dispatch = useDispatch();


   const addToCartHandler = () => {
     dispatch(cartAction.addItems({
      key:props.id,
      id:props.id,
      title:props.title,
      amount:1,
      totalprice:props.price,
      price:props.price,
      imageurl:props.imageUrl
     }))
   }

   return (
<div>

    <Card style={{width:'10rem'}} className="my-3">
    <Link to={`/product/${props.id}`}>
      <Card.Img variant="top" src={props.imageUrl} />
    </Link>
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>price ${props.price}</Card.Text>
      
    </Card.Body>
    
  </Card>
  <Button onClick={addToCartHandler} variant="primary">Add to Cart</Button>
  </div>







    // <div>

    //       <Link to={`/product/${props.id}`} className="text-decoration-none text-dark cursor-pointer">
    //             <h4 className="text-center my-3 p-1 ">{props.title}</h4>
    //             <Image className={classes.image} width={160} height={160} src={props.imageUrl} rounded/>
    //       </Link>        
    //           <div className="m-1 p-1">
    //             <div><p><span>Price </span>{`$${props.price}`}</p></div>
    //             <Button onClick={addToCartHandler}>Add to Cart</Button>
    //           </div>
    // </div>
   )
};

export default Productlist;