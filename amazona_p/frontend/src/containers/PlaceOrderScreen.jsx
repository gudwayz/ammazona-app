import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { orderConstants } from '../actions/Constants';
import { createOrder } from '../actions/Order.actions';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const PlaceOrderScreen = (props) => {
    const cart = useSelector(state=>state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payment')
    }

    const orderCreate = useSelector(state=>state.orderCreate);

    const{loading, success,order, error}= orderCreate;
    

    const toPrice=(num)=>Number(num.toFixed(2))

    cart.itemPrice= toPrice(cart.cartItems.reduce((a,c)=>a +c.qty * c.price, 0));
    cart.shippingPrice=cart.itemsPrice>100 ?toPrice(0):toPrice(10);
    cart.taxPrice = toPrice(0.15*cart.itemPrice);
    cart.totalPrice = (cart.itemPrice + cart.shippingPrice + cart.taxPrice)

    const dispatch = useDispatch()
    const placeOrderHandler=(e)=>{
        dispatch(createOrder({...cart, orderItems:cart.cartItems}))
    }
    useEffect(()=>{
        if(success){
            props.history.push(`/orders/${order._id}`);
            dispatch({type:orderConstants.ORDER_CREATE_RESET})
        }
    },[success,order,dispatch,props.history])

    return (
        <div>
            <CheckoutSteps steps1 steps2 steps3 steps4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{cart.shippingAddress.fullName}<br/>
                                    <strong>Address:</strong>{cart.shippingAddress.address},<br/>
                                    {cart.shippingAddress.city}, <br/>
                                    {cart.shippingAddress.postalCode}, <br/>
                                    {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Payments</h2>
                                <p>
                                    <strong>Payment Methods:</strong>{cart.paymentMethod}
                                   
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                   {cart.cartItems.map((item)=>(
                       <li key={item.product}>
                           <div className="row">
                               <div>
                                   <img src={item.image} alt={item.name} className="small"/> 
                               </div>
                               <div className="min-30">
                                    <Link to={`/products/${item.product}`}>{item.name}</Link>  
                               </div>
                               
                               <div>{item.qty} X ${item.price} = ${item.qty*item.price}</div>
                               
                           </div>
                       </li>
                   ))}
               </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-bady">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div><strong>Total</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="submit" className="block primary" 
                                onClick={placeOrderHandler} disabled={cart.cartItems===0}>place Order</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen
