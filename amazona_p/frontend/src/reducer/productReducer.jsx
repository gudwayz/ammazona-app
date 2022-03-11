import { productConstants } from "../actions/Constants";

export const productListReducer = ( state = {
    loading: true,
    products:[]
     }, action) =>{
    switch(action.type){
        case productConstants.PRODUCT_LIST_REQUEST:
            return{loading:true};
        
        case productConstants.PRODUCT_LIST_SUCCESS:
            return{loading:false,
                    products:action.payload
                };
        
        case productConstants.PRODUCT_LIST_FAILURE:
                    return{loading:false,
                            error:action.payload
                        }
        default:
            return state;
    }
}