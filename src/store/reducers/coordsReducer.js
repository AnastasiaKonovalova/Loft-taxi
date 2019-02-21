import {fetchCoordsRequest, fetchCoordsSuccess, fetchCoordsFailure, setIsOrderMade} from '../actions';

const initialState = {
    isLoadingCoords: false,
    error: null,
    coords: null,
    isOrderMade: false
}


const coordsReducer = (state = initialState, action) => {
    switch(action.type){
        case fetchCoordsRequest.toString():
            return {
                ...state,
                isLoadingCoords: true,
            }

        case fetchCoordsSuccess.toString():
            return {
                ...state,
                error: null,
                coords: action.payload,
                isLoadingCoords: false,
                
            }

        case fetchCoordsFailure.toString():
            return {
                ...state,
                coords: null,
                error: action.payload,
                errorCoords: 'Ошибка построения маршрута. Проверьте подключение к сети',
                isLoadingCoords: false,
            }

        case setIsOrderMade.toString():
            return {
                ...state,
                isOrderMade: action.payload
            }

        default:
            return state
    }
}

export default coordsReducer;