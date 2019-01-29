import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import loadAddressesReducer from './loadAddressesReducer';
import coordsReducer from './coordsReducer';

const rootReducer = combineReducers({
    authReducer,
    loadAddressesReducer,
    coordsReducer,
    form: formReducer
})
export default rootReducer;

export const getIsLoggedIn = state => state.authReducer.isLoggedIn;
export const getProfile = state => state.authReducer.profile;
export const getIsProfileFilled = state => Object.keys(state.authReducer.profile).length > 0;

export const getIsLoadingAddresses = state => state.loadAddressesReducer.isLoadingAddresses;
export const getLoadErrorText = state => state.loadAddressesReducer.errorText;
export const getMyAddresses = state => state.loadAddressesReducer.myAddresses;

export const getIsLoadingCoords = state => state.coordsReducer.isLoadingCoords;
export const getCoordsError = state => state.coordsReducer.error;
export const getCoords = state => state.coordsReducer.coords;
export const getIsOrderMade = state => state.coordsReducer.isOrderMade;