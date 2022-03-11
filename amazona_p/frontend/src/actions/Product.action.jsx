import Axios from "axios";
import { productConstants, productDetailsConstants } from "./Constants"

export const listProducts = () => async(dispatch)=>{
    dispatch({
        type:productConstants.PRODUCT_LIST_REQUEST,
    });
    try{
        const{ data } = await Axios.get('/api/products');
        dispatch({
            type: productConstants.PRODUCT_LIST_SUCCESS,
            payload: data
        });
    }
    catch(err){
        dispatch({
            type: productConstants.PRODUCT_LIST_FAILURE,
            payload: err.message
        });
    }
}
export const detailProducts = (productId) => async (dispatch) =>{
    dispatch({
        type: productDetailsConstants.PRODUCT_DETAILS_REQUEST,
        payload:productId
    })
    try{
        const {data} = await Axios.get(`/api/products/${productId}`);
        dispatch({type:productDetailsConstants.PRODUCT_DETAILS_SUCCESS,
        payload: data})
    }
    catch(err){
        dispatch({type:productDetailsConstants.PRODUCT_DETAILS_FAILURE,
            payload: err.response && err.response.data.message ?err.response.data.message: err.message})
    
    }
} 