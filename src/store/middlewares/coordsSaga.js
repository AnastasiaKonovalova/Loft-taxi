import { put, call, takeEvery } from "redux-saga/effects";

import {
    fetchCoordsRequest, 
    fetchCoordsSuccess, 
    fetchCoordsFailure} from '../actions';
import {loadCoords} from '../../services/helpers_api';


export function * saveCoordsWorker(action){
    const { error, data } = yield call(loadCoords, action.payload);
    try {
        if(!error) yield put(fetchCoordsSuccess(data));
        if(error) yield put(fetchCoordsFailure(error))
    } catch (error) {
        yield put(fetchCoordsFailure(error))
    }
}

export function * getCoordsWatcher(){
    yield takeEvery(fetchCoordsRequest.toString(), saveCoordsWorker);
};
