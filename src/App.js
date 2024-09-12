import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Main from './Main';
import About from './navFiles/About';
import Home from './navFiles/Home';
import Contact from './navFiles/Contact';
import ProductDetail from './components/products/ProductDetail';
import AuthenticationPage from './Auth/Pages/AuthenticationPage';
import ProfilePage from './Auth/Pages/ProfilePage';
import Cart from './components/Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendCartdata } from './store/cartActions';
import { fetchCartData } from './store/cartActions';

let initialLoading = true;
function App() {
  const dispatch = useDispatch();
  const authState = useSelector((state)=>state.auth);
  const showCart = useSelector((state)=>state.modalUi.CartIsVisible);
  const cart = useSelector(state => state.cartItems);
  const isLogin = authState.isLoggedIn;



  useEffect(()=>{
    dispatch(  fetchCartData())
  },[dispatch])


  useEffect(()=>{
    if(initialLoading){
      initialLoading=false;
      return;
    }
    dispatch(sendCartdata(cart))
  },[cart,dispatch])
  




  return (



    <>
   <ToastContainer/>
      {showCart && <Cart/>}
      <Router>
        <Switch>
          {!isLogin && (
            <Route exact path='/login'>
              <AuthenticationPage />
            </Route>
          )}
          <Route exact path='/profile'>
            {isLogin ? <ProfilePage/> : <Redirect to='/login' />}
          </Route>
          <Route exact path='/store'>
            {isLogin ? <Main/> : <Redirect to='/login' />}
          </Route>
          <Route path='/about'>
            {isLogin ? <About/> : <Redirect to='/login' />}
          </Route>
          <Route path='/' exact>
            {isLogin ? <Home/> : <Redirect to='/login' />}
          </Route>
          <Route path='/contact'>
            {isLogin ? <Contact /> : <Redirect to='/login' />}
          </Route>
          <Route path='/product/:productId'>
            <ProductDetail/>
          </Route>
          <Route path='*'>
            <Redirect to={isLogin ? '/' : '/login'} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
