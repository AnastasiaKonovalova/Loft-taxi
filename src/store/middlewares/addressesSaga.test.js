import { put, call } from "redux-saga/effects";
import { 
    fetchAddressesRequest, 
    fetchAddressesSuccess, 
    fetchAddressesFailure } from '../../store/actions';
import { loadAddressList } from '../../services/helpers_api';
import { loadAddressesWorker } from './addressesSaga';

describe('loadAddressesWorker with error', () => {
    const gen = loadAddressesWorker(fetchAddressesRequest);

    it('calls loadAddressList', () => {
        expect(gen.next().value).toEqual(call(loadAddressList))
    });

    it('puts fetchAddressesFailure with error', () => {
        expect(gen.next({error: 'test error'}).value).toEqual(put(fetchAddressesFailure('test error')))
    });

    it('saga is finished', () => {
        expect(gen.next().done).toEqual(true)
    })
});

describe('loadAddressesWorker with success', () => {
    const gen = loadAddressesWorker(fetchAddressesRequest);
    const testAdresses = {data: {addresses: ['Пулково (LED)', 'Волковское кладбище']}};

    it('calls loadAddressList', () => {
        expect(gen.next().value).toEqual(call(loadAddressList))
    });

    it('puts fetchAddressesSuccess with result', () => {
        expect(gen.next(testAdresses).value).toEqual(put(fetchAddressesSuccess(testAdresses.data.addresses)))
    });

    it('saga is finished', () => {
        expect(gen.next().done).toEqual(true)
    })
})