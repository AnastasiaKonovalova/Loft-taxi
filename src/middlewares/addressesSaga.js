import { all, put, call, take, takeEvery } from "redux-saga/effects";
import {fetchAddressesRequest, fetchAddressesSuccess, fetchAddressesFailure} from '../actions';
import {loadAddressList} from '../helpers_api';

export function * fetchAddressesWorker(action){
    try {
        const myAddresses = yield call(loadAddressList);

        return myAddresses;
    } catch (error){
        return {error: error.message};
    }
}

export function * saveAddressesWorker(action){
    const {error, addresses} = yield call(fetchAddressesWorker);
    
    if(error){
        yield put(fetchAddressesFailure(error))
    } else {
        yield put(fetchAddressesSuccess(addresses))
    }
}

export function * loadAddressesWatcher(){
    yield takeEvery(fetchAddressesRequest.toString(), saveAddressesWorker);
};
