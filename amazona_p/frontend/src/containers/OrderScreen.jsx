import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/Order.actions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const OrderScreen = (props) => {
     const orderId = props.match.params.id;
     const orderDetails = useSelector(state=>state.orderDetails);
     const{order, loading, error}=orderDetails;

    const dispatch = useDispatch()
   
    useEffect(()=>{   
            dispatch(detailsOrder(orderId))
        
    },[dispatch,orderId])

    const paymentRedirect=()=>{
        props.history.push(`/orders/${orderId}/pay`)
    }

    return loading ? <LoadingBox></LoadingBox>:
            error? <MessageBox variant="danger">{error}</MessageBox>:
        (<div>
           <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{order.shippingAddress.fullName}<br/>
                                    <strong>Address:</strong>{order.shippingAddress.address},<br/>
                                    {order.shippingAddress.city}, <br/>
                                    {order.shippingAddress.postalCode}, <br/>
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered?
                                <MessageBox variant="success">Delivered At: {order.deliveredAt}</MessageBox>:
                                <MessageBox variant="danger">Not yet Delivered</MessageBox>}
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Payments</h2>
                                <p>
                                    <strong>Payment Methods:</strong>{order.paymentMethod}
                                   
                                </p>
                                {order.isPaid?
                                <MessageBox variant="success">Paid At: {order.isPaid}</MessageBox>:
                                <MessageBox variant="danger">Not yet Paid</MessageBox>}
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                   {order.orderItems.map((item)=>(
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
                                    <div>${order.itemPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div><strong>Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                                <div>
                                    <button type="submit" onClick={paymentRedirect} className="block primary"><strong>Pay</strong></button>
                                </div>
                            </li>
                            
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderScreen
