import Axios from "axios"
import { cartConstants } from "./Constants";

export const addToCart=(productId, qty)=>async(dispatch, getState)=>{
const{data}= await Axios.get(`/api/products/${productId}`);
    dispatch({
        type: cartConstants.CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart=(productId)=>async(dispatch, getState)=>{
    dispatch({type:cartConstants.CART_REMOVE_ITEM,
                 payload:productId
            });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress=(data)=>async(dispatch)=>{
dispatch({type:cartConstants.CART_SAVE_SHIPPING_ADDRESS,
payload:data});
localStorage.setItem("saveAddress",JSON.stringify(data))
}

export const savePaymentMethod=(data)=>async(dispatch)=>{
    dispatch({type:cartConstants.CART_SAVE_PAYMENT_METHOD,
    payload:data});
    
    }