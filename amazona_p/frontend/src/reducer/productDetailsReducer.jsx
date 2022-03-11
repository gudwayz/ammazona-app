/* eslint-disable no-duplicate-case */
import { productDetailsConstants } from "../actions/Constants";

export const productDetailsReducer = (state={loading:true, product:{}}, action)=>{
    switch(action.type){
        case productDetailsConstants.PRODUCT_DETAILS_FAILURE:
            return {loading:true};
        case productDetailsConstants.PRODUCT_DETAILS_SUCCESS:
            return{loading:false,
            product:action.payload};
        
        case productDetailsConstants.PRODUCT_DETAILS_FAILURE:
            return{loading:false,
            error:action.payload};
        
        default:
            return state;
    }
}