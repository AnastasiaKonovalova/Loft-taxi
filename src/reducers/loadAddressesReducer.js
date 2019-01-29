import { fetchAddressesRequest, fetchAddressesSuccess, fetchAddressesFailure} from '../actions';

const initialAddressesState = {
    myAddresses: [],
    isLoadingAddresses: null,
    error: null,
    errorText: null
}

const loadAddressesReducer = (state = initialAddressesState, action) => {
    switch(action.type){
        case fetchAddressesRequest.toString():
            return {
                ...state,
                isLoadingAddresses: true 
            }

        case fetchAddressesSuccess.toString():
            return {
                ...state,
                myAddresses: action.payload,
                isLoadingAddresses: false 
            }

        case fetchAddressesFailure.toString():
            return {
                ...state,
                error: action.payload,
                errorText: 'Ошибка загрузки',
                isLoadingAddresses: false 
            }

        default:
        return state
    }
}

export default loadAddressesReducer;