import { put, call, takeEvery } from "redux-saga/effects";

import {
    fetchCoordsRequest, 
    fetchCoordsSuccess, 
    fetchCoordsFailure} from '../actions';
import {loadCoords} from '../../services/helpers_api';


export function * saveCoordsWorker(action){
    try {
        const { error, data } = yield call(loadCoords, action.payload);
        if(!error) yield put(fetchCoordsSuccess(data));
        if(error) yield put(fetchCoordsFailure(error.mesage))
    } catch (error) {
        yield put(fetchCoordsFailure(error.message))
    }
}

export function * getCoordsWatcher(){
    yield takeEvery(fetchCoordsRequest.toString(), saveCoordsWorker);
};
