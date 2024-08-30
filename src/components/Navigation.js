import { useState,useEffect } from "react";
import { Button, Container,Nav,Navbar,Badge } from "react-bootstrap";
import classes from './Navigation.module.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector ,useDispatch } from "react-redux";
import { authAction } from "../store/authSlice";
import { uiAction } from "../store/ui-Slice";



const Navigation = (props) =>{
    const dispatch = useDispatch()
    const items = useSelector((state)=>state.cartItems.items);
    const isLogin = useSelector((state)=>state.auth.isLoggedIn)
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
   
    const history = useHistory();

   

        let CartItems = items.reduce((currNum,item)=>{
            return currNum + item.amount
        },0);

        console.log(items)

        const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

        useEffect(() => {
          if (items.length === 0) {
            return;
          }
          setBtnIsHighlighted(true);
      
          const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
          }, 300);
      
          return () => {
            clearTimeout(timer);
          };
        }, [items]);

        const logoutHandler = () => {
          localStorage.clear();
          dispatch(authAction.logoutHandler());
          history.replace('/')
        }


    return(
        <>
        <Navbar bg='dark' expand='lg' variant="dark">
        <Container >
            <Navbar.Brand>E-Commerce</Navbar.Brand>
            <Nav>
                <Nav.Link  className="me-5 cursor-pointer" as={Link} to="/" >Home</Nav.Link>
                <Nav.Link  className="me-5 cursor-pointer" as={Link} to="/store" >Store</Nav.Link>
                <Nav.Link  className="me-5 cursor-pointer" as={Link} to="/about" >About</Nav.Link>
                <Nav.Link  className="me-5 cursor-pointer" as={Link} to="/contact" >Contact</Nav.Link>
     
            </Nav>
            
            {isLogin && <Button variant="warning" onClick={()=>dispatch(uiAction.toogle())} className={btnClasses}>Cart   
    
              <Badge bg="light" text="dark" className={`p-1 mx-2 ${classes.cartbadge}`}>
                {CartItems}
              </Badge>
            </Button>}

            <Nav>
                {!isLogin && <Nav.Link  className="me-5 cursor-pointer" as={Link} to="/login" >Login</Nav.Link>}
                {isLogin&& <Nav.Link  className="me-5 cursor-pointer" as={Link} to="/profile" >Profile</Nav.Link>}
                {isLogin && <Button variant="danger" onClick={logoutHandler}>Logout</Button>}
            </Nav>
        </Container>
        </Navbar>

        

        </>
    )
   


}

export default Navigation;