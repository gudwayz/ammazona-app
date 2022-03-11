import { orderConstants } from "../actions/Constants";

export const createOrderReducer = (state={}, action)=>{
    switch(action.type){
        case orderConstants.ORDER_CREATE_REQUEST:
            return {loading:true}

        case orderConstants.ORDER_CREATE_SUCCESS:
                return {loading:false, success:true, order:action.payload}
        
        case orderConstants.ORDER_CREATE_FAILURE:
            return {loading:false,  error:action.payload}
        
            case orderConstants.ORDER_CREATE_RESET:
                return {}
    

    default:
        return state;
    }
}

export const orderDetailsReducer=(state={loading: true, order:{}}, action)=>{
    switch(action.type){
        case orderConstants.ORDER_DETAILS_REQUEST:
            return{loading:true}
        
        case orderConstants.ORDER_DETAILS_SUCCESS:
                return{loading:false, order:action.payload};

            
      case orderConstants.ORDER_DETAILS_FAILURE:
                    return{loading:false, error:action.payload}
    default:
        return state;
    }
}