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
