import { put, call } from "redux-saga/effects";
import { 
    fetchAddressesRequest, 
    fetchAddressesSuccess, 
    fetchAddressesFailure } from '../../store/actions';
import { loadAddressList } from '../../services/helpers_api';
import { saveAddressesWorker, fetchAddressesWorker } from './addressesSaga';

// describe('fetchAddressesWorker', () => {
//     const gen = fetchAddressesWorker(fetchAddressesRequest);

//     it('calls loadAddressList', () => {
//         expect(gen.next().value).toEqual(call(loadAddressList))
//     });

//     it('saga is finished', () => {
//         expect(gen.next().done).toEqual(true)
//     })
// });


describe('saveAddressesWorker with error', () => {
    const gen = saveAddressesWorker(fetchAddressesRequest);

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

describe('saveAddressesWorker with success', () => {
    const gen = saveAddressesWorker(fetchAddressesRequest);
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