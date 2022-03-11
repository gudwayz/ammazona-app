import { cartConstants } from "../actions/Constants";

export const cartReducer =(state ={cartItems:[]}, action)=>{
    switch(action.type){
        case cartConstants.CART_ADD_ITEM:
            const item = action.payload;
            const itemExist = state.cartItems.find(x=>x.product === item.product);
            if(itemExist){
                return{
                    ...state,
                    cartItems:state.cartItems.map((x)=>x.product === itemExist.product?item:x),
                }
            }else{
                return{...state, cartItems:[...state.cartItems, item]}
            }

            case cartConstants.CART_REMOVE_ITEM:
                return{...state, cartItems:state.cartItems.filter(x=>x.product !== action.payload)}

            case cartConstants.CART_SAVE_SHIPPING_ADDRESS:
                return{
                    ...state,
                    shippingAddress:action.payload
                }
            
                case cartConstants.CART_SAVE_PAYMENT_METHOD:
                    return{
                        ...state,
                        paymentMethod:action.payload
                    }

                    case cartConstants.CART_EMPTY:
                        return{
                            ...state,
                            cartItems:[]
                        }
        default:
            return state;
    }
}