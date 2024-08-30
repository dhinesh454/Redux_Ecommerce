import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Main from './Main';
import About from './navFiles/About';
import Home from './navFiles/Home';
import Contact from './navFiles/Contact';
import ProductDetail from './components/products/ProductDetail';
import AuthenticationPage from './Auth/Pages/AuthenticationPage';
import ProfilePage from './Auth/Pages/ProfilePage';
import Cart from './components/Cart/Cart';
import { useSelector } from 'react-redux';

function App() {

  const isLogin = useSelector((state)=>state.auth.isLoggedIn);
  const showCart = useSelector((state)=>state.modalUi.CartIsVisible);
  

  // const fetchCartItems = useCallback(async () => {
  //   const localid = localStorage.getItem('localId');

  //   try {
  //     const response = await fetch(`https://ecommerce-5696a-default-rtdb.firebaseio.com/items/${localid}.json`);
  //     if (!response.ok) {
  //       throw new Error('Fetching cart error, please check again');
  //     }
  //     const data = await response.json();
  //     const fetchedItems = [];

  //     for (const key in data) {
  //       fetchedItems.push({
  //         key: key,
  //         id: data[key].id,
  //         title: data[key].title,
  //         amount: data[key].amount,
  //         price: data[key].price,
  //         imageurl: data[key].imageurl,
  //       });
  //     }

  //     authCtx.setItems(fetchedItems);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [authCtx]);

  // useEffect(() => {
   
  //     fetchCartItems();
  
  // }, [fetchCartItems]);


  return (
    <>
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
