import { reducer as formReducer, startSubmit, stopSubmit, SubmissionError } from "redux-form";
import { all, put, call, take, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";

import {login, testAuth} from '../actions';
import {checkAuth} from '../helpers_api';

function * authPostWorker(action) {
    try {
        const result = yield call(checkAuth, action.payload)

        return result
    } catch (error) {
        return {error: error.message}
    }
}

function * authWorker (action){
    // while(true){
        // const authAction = yield take(testAuth.toString());
        yield put(startSubmit('loginform'));
        const {error, success} = yield call(authPostWorker, action);
        // console.log('saga cond result', error, success)
        if (!success){
            // throw new SubmissionError({
            //     userName: 'Неверное имя пользователя или пароль', 
            //     userPassword: 'Неверное имя пользователя или пароль', 
            //     _error: error
            // })
            yield put(stopSubmit('loginform', {
                userName: 'Неверное имя пользователя или пароль', 
                userPassword: 'Неверное имя пользователя или пароль', 
                _error: error
            }))
        } else {
            yield put(login(success));
            // yield put(stopSubmit('loginform'));
        }
    // }
}

export function * authWatcher(){
    yield takeLeading (testAuth.toString(), authWorker)
}

