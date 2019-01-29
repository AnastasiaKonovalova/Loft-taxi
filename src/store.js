import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';



const getInitialState = () => {
    let {isLoggedIn, profile} = JSON.parse(localStorage.state);
    if(!profile) profile = {};
    if(!isLoggedIn) isLoggedIn = false
    return {isLoggedIn: isLoggedIn, profile: profile};
}

export const sagaMiddleware = createSagaMiddleware();

const getStore = () => createStore(
    rootReducer, 
    {authReducer: {...getInitialState()}},
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ 
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : noop => noop
    )
)
export default getStore
