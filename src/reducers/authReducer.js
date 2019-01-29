import {login, logout, handleProfileSubmit, handleProfileClear} from '../actions';


const initialState = {
    isLoggedIn: false,
    profile: {}
}


const authReducer = (state = initialState, action) => {
    switch(action.type){
        case login.toString():
            return {
                ...state,
                isLoggedIn: action.payload,
            }

        case logout.toString():

            return {
                ...state,
                isLoggedIn: action.payload,
            }

        case handleProfileSubmit.toString():
            const {profile} = action.payload
            return {
                ...state,
                profile: profile 
            }

        case handleProfileClear.toString():
            return {
                ...state,
                profile: {} 
            }

        default:
            return state
    }
}

export default authReducer;