import { userConstants } from "../actions/Constants";

export const userSigninReducer=(state={}, action)=>{
switch(action.type){
    case userConstants.USER_SIGNIN_REQUEST:
        return{loading:true};
    
    case userConstants.USER_SIGNIN_SUCCESS:
        return{loading:false,
                userInfo:action.payload
       }

    case userConstants.USER_SIGNIN_FAILURE:
        return{loading:false,
                error:action.payload
       }

       case userConstants.USER_SIGNOUT:
        return{}
    default:
        return state;
}

}


export const userRegisterReducer=(state={}, action)=>{
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:
            return{loading:true};
        
        case userConstants.USER_REGISTER_SUCCESS:
            return{loading:false,
                    userInfo:action.payload
           }
    
        case userConstants.USER_REGISTER_FAILURE:
            return{loading:false,
                    error:action.payload
           }
    
        default:
            return state;
    }
}

export const userDetailsReducer =(state={loading:true}, action)=>{
    switch(action.type){
        case userConstants.USER_DETAILS_REQUEST:
            return{loading:true}

        case userConstants.USER_DETAILS_SUCCESS:
            return{loading:false,
            user:action.payload}

        case userConstants.USER_DETAILS_FAILURE:
            return{loading:false,
            error:action.payload}

        default:
            return state;
    }

}

export const userUpdateProfileReducer=(state={}, action)=>{
    switch(action.type){
        case userConstants.USER_UPDATE_PROFILE_REQUEST:
            return{loading:true};

        case userConstants.USER_UPDATE_PROFILE_SUCCESS:
           return{loading:false, success:true};

        case userConstants.USER_UPDATE_PROFILE_FAILURE:
            return{loading:false, error:action.payload};
        
        case userConstants.USER_UPDATE_PROFILE_RESET:
            return{}


    default:
        return state;        
    }
}