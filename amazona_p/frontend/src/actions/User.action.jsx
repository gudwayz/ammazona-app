import axios from "axios";
import Axios from "axios";
import { userConstants } from "./Constants"

export const signin =(email, password)=>async(dispatch)=>{
    dispatch({
        type:userConstants.USER_SIGNIN_REQUEST,
    payload:{email, password}
    });
    try{
        const{data} = await Axios.post('/api/users/signin', {email,password});
        dispatch({type:userConstants.USER_SIGNIN_SUCCESS,
        payload:data});
        localStorage.setItem('userInfo', JSON.stringify(data));
        
    }
    catch(err){
        dispatch({
            type:userConstants.USER_SIGNIN_FAILURE,
            payload: err.response && err.response.data.message ?err.response.data.message: err.message
        })
    }
}

export const register =(name,email, password)=>async(dispatch)=>{
    dispatch({
        type:userConstants.USER_REGISTER_REQUEST,
    payload:{name,email, password}
    });
    try{
        const{data} = await Axios.post('/api/users/register', {name,email,password});
        dispatch({type:userConstants.USER_REGISTER_SUCCESS,
        payload:data});
        dispatch({type:userConstants.USER_SIGNIN_SUCCESS,
            payload:data});
    
        localStorage.setItem('userInfo', JSON.stringify(data));
        
    }
    catch(err){
        dispatch({
            type:userConstants.USER_REGISTER_FAILURE,
            payload: err.response && err.response.data.message ?err.response.data.message: err.message
        })
    }
}

export const signout = ()=>async(dispatch)=>{
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({type:userConstants.USER_SIGNOUT})
}

export const detailsUser=(userId)=>async(dispatch, getState)=>{
    dispatch({type:userConstants.USER_DETAILS_REQUEST,
    payload:userId});

    const{ userSignin:{userInfo}}=getState();
       try{
        const {data}= await axios.get(`/api/users/${userId}`, {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
 
        dispatch({
            type:userConstants.USER_DETAILS_SUCCESS,
            payload:data
        })
        
    }catch(error){
        dispatch({
            type:userConstants.USER_DETAILS_FAILURE,
            payload: error.response && error.response.data.message ?error.response.data.message: error.message
        })
    }

}

export const updateUserProfile=(user)=>async(dispatch, getState)=>{
dispatch({type:userConstants.USER_UPDATE_PROFILE_REQUEST,
payload:user});
const{userSignin:{userInfo}}=getState();
try{
    const {data}= await axios.put(`/api/users/profile`, user,{
     headers:{
        Authorization:`Bearer ${userInfo.token}`
    }});
    dispatch({type:userConstants.USER_UPDATE_PROFILE_SUCCESS,
    payload:data});
    dispatch({type:userConstants.USER_SIGNIN_SUCCESS,
        payload:data});
    localStorage.setItem('userInfo', JSON.stringify(data))
}
catch(error){
    dispatch({
        type:userConstants.USER_UPDATE_PROFILE_FAILURE,
        payload: error.response && error.response.data.message ?error.response.data.message: error.message
    })
}
}