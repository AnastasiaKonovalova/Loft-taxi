import { spawn } from "redux-saga/effects";

import {authWatcher} from './authSaga';
import {loadAddressesWatcher} from './addressesSaga';
import {getCoordsWatcher} from './coordsSaga';
import {handleLocalStorageSaga} from './localStorageSaga';


export default function* rootSaga() {
    yield spawn(authWatcher)
    yield spawn(loadAddressesWatcher)
    yield spawn(getCoordsWatcher)
    yield spawn(handleLocalStorageSaga)
}