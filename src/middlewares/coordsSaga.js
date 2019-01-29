import { all, put, call, take, takeEvery } from "redux-saga/effects";

import {fetchCoordsRequest, fetchCoordsSuccess, fetchCoordsFailure} from '../actions';
import {loadCoords} from '../helpers_api';

export function * fetchCoordsWorker(action){
    try {
        const coords = yield call(loadCoords, action.payload);
        return {coords};
    } catch (error){
        return {error: error.message};
    }
}

export function * saveCoordsWorker(action){
    const {error, coords} = yield call(fetchCoordsWorker, action);
    
    if(error){
        yield put(fetchCoordsFailure(error))
    } else {
        yield put(fetchCoordsSuccess(coords))
    }
}

export function * getCoordsWatcher(){
    yield takeEvery(fetchCoordsRequest.toString(), saveCoordsWorker);
};
