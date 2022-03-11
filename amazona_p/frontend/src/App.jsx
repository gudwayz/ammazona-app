import ProductScreen from './containers/ProductScreen'
import HomeScreen from './containers/HomeScreen'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import CartScreen from './containers/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './containers/SigninScreen';
import RegisterScreen from './containers/RegisterScreen';
import { signout } from './actions/User.action';
import ShippingAddressScreen from './containers/ShippingAddressScreen';
import PaymentMethodsScreen from './containers/PaymentMethodsScreen';
import PlaceOrderScreen from './containers/PlaceOrderScreen';
import OrderScreen from './containers/OrderScreen';
import ProfileScreen from './containers/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';



function App() {
    const dispatch=useDispatch();
    const cart = useSelector(state=>state.cart);
    const {cartItems} = cart;

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const signOutHandler=()=>{
        dispatch(signout())
    }

    return (
        <>
            <Router>
                <div className="grid-container">
                    <header className="row">
                        <div>
                            <Link className="brand" to="/">ammazona</Link>
                        </div>
                        <div>
                            <Link to="/cart">my cart
                            {cartItems.length >0 && (
                                <span className="badge">{cartItems.length}</span>
                            )}
                            </Link>
                            {
                                userInfo ?(
                                    <div className="dropdown">
                                    <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i>{' '}
                                    </Link>
                                    <ul className="dropdown-content">
                                    <Link to="/profile">user Profile</Link>
                                    <Link to="#">Order History</Link>
                                        <Link to="#signout" onClick={signOutHandler}>Signout</Link>
                                        
                                    </ul>
                                </div>
                                )
                                :
                                <Link to="/signin">sign-in</Link>
                            }
                            {userInfo && userInfo.isAdmin && (
                                <div className="dropdown">
                                    <Link to='#admin'>Admin {' '}<i className="fa fa-caret-down"></i></Link> 
                                    <ul className="dropdown-content">
                                        <li>
                                            <Link to='/dashboard'>Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link to='/productlist'>Products</Link>
                                        </li>
                                        <li>
                                            <Link to='/orderlist'>Orders</Link>
                                        </li>
                                        <li>
                                            <Link to='/userlist'>Users</Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </header>
                    <main>
                    <PrivateRoute path='/profile' component={ProfileScreen}/>
                        <Route path='/' exact component={HomeScreen}/>
                        <Route path='/signin' component={SigninScreen}/>
                        <Route path='/register' component={RegisterScreen}/>
                        <Route path='/shipping' component={ShippingAddressScreen}/>
                        <Route path='/payment' component={PaymentMethodsScreen}/>
                        <Route path='/placeorder' component={PlaceOrderScreen}/>
                        <Route path='/product/:id' component={ProductScreen}/>
                        <Route path='/orders/:id' component={OrderScreen}/>
                        <Route path='/cart/:id?' component={CartScreen}/>
                        
                        
                       
                    </main>
                    <footer className="row center ">All right reserved</footer>
                </div>
            </Router>

        </>
    );
}

export default App;