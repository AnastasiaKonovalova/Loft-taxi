import { put, call, takeEvery } from "redux-saga/effects";
import {
    fetchAddressesRequest, 
    fetchAddressesSuccess, 
    fetchAddressesFailure } from '../actions';
import { loadAddressList } from '../../services/helpers_api';

export function * fetchAddressesWorker(action){
    try {
        const { data } = yield call(loadAddressList);

        return data;
    } catch (error){
        return {error: error.message};
    }
}

export function * saveAddressesWorker(){
    const {error, data} = yield call(loadAddressList);
    try {
        if(!error) yield put(fetchAddressesSuccess(data.addresses));
        if(error) yield put(fetchAddressesFailure(error))
    } catch (error){
        yield put(fetchAddressesFailure(error))
    }
}

export function * loadAddressesWatcher(){
    yield takeEvery(fetchAddressesRequest.toString(), saveAddressesWorker);
};
