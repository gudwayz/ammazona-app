import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/Cart.actions';
import MessageBox from '../components/MessageBox';

const CartScreen = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
const dispatch = useDispatch();


const cart = useSelector(state=>state.cart);
const {cartItems} = cart;

const removeFromCartHandler=(id)=>{
dispatch(removeFromCart(id))
}

const onCheckHandler=()=>{
    props.history.push('/signin?redirect=shipping')
    }
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    },[dispatch,productId, qty])
    return (
       <div className="row top">
           <div className="col-2">
               <h1>Shopping Cart</h1>
               {cartItems.length ===0 ? <MessageBox>
                   Cart is empty. &nbsp; 
                   <Link to="/">Go for shopping</Link>
               </MessageBox> :
               (<ul>
                   {cartItems.map((item)=>(
                       <li key={item.product}>
                           <div className="row">
                               <div>
                                   <img src={item.image} alt={item.name} className="small"/> 
                               </div>
                               <div className="min-30">
                                    <Link to={`/products/${item.product}`}>{item.name}</Link>  
                               </div>
                               <div>
                                   <select 
                                   value={item.qty} 
                                   onchange={e=>dispatch(addToCart(item.product, Number(e.target.value)))}>
                                       {[...Array(item.countInStock).keys()].map((x)=>
                                                               (<option key={x+1} value={x+1}>{x+1}</option>) )}
                                   </select>
                               </div>
                               <div>${item.price}</div>
                               <div>
                                   <button type="button" onClick={()=>removeFromCartHandler(item.product)}>Delete</button>
                               </div>
                           </div>
                       </li>
                   ))}
               </ul>)}
           </div>
           <div className="col-1 ce">
               <div classNme="card card-body">
                   <ul>
                       <li>
                           <h2>
                               Subtotal ({cartItems.reduce((a,c)=> a + c.qty, 0)} items) : ${cartItems.reduce((a,c)=> a + c.price* c.qty, 0)}</h2>
                       </li>
                       <li>
                           <button className="block primary" disabled = {cartItems.length===0} type="button" onClick={onCheckHandler}>Checkout</button>
                       </li>
                   </ul>
               </div>
           </div>
       </div>
    )
}

export default CartScreen
