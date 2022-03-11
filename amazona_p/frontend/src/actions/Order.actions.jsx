import axios from "axios";
import { cartConstants, orderConstants } from "./Constants"

export const createOrder=(order)=>async(dispatch, getState)=>{
    dispatch({
        type:orderConstants.ORDER_CREATE_REQUEST,
        payload:order
    });
    try{
        const{userSignin:{userInfo}} =getState();
        const {data} = await axios.post('/api/orders', order, {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type:orderConstants.ORDER_CREATE_SUCCESS,
            payload:data.order
        });
        dispatch({type:cartConstants.CART_EMPTY,
        });
        localStorage.removeItem('cartItems')

    }catch(error){
        dispatch({
            type:orderConstants.ORDER_CREATE_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });

    }
}

export const detailsOrder=(orderId)=>async(dispatch, getState)=>{
dispatch({type:orderConstants.ORDER_DETAILS_REQUEST,
payload:orderId});
const {userSignin:{userInfo}}=getState();
const{ data }= await axios.get(`/api/orders/${orderId}`, {
    headers:{
        Authorization:`Bearer ${userInfo.token}`
    }})
try{
   
    dispatch({type:orderConstants.ORDER_DETAILS_SUCCESS,
    payload: data})

}catch(error){
    dispatch({type:orderConstants.ORDER_DETAILS_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message})
}
}