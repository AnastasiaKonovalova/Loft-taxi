import {createAction} from 'redux-actions';

export const login = createAction('LOGIN');
export const logout = createAction('LOGOUT');
export const testAuth = createAction('AUTH');

export const handleProfileSubmit = createAction('HANDLE_PROFILE_SUBMIT');
export const handleProfileClear = createAction('HANDLE_PROFILE_CLEAR');

export const fetchAddressesRequest = createAction('FETCH_ADDRESSES_REQUEST');
export const fetchAddressesSuccess = createAction('FETCH_ADDRESSES_SUCCESS');
export const fetchAddressesFailure = createAction('FETCH_ADDRESSES_FAILURE');

export const fetchCoordsRequest = createAction('FETCH_COORDS_REQUEST');
export const fetchCoordsSuccess = createAction('FETCH_COORDS_SUCCESS');
export const fetchCoordsFailure = createAction('FETCH_COORDS_FAILURE');

export const setIsOrderMade = createAction('SET_IS_ORDER_MADE');