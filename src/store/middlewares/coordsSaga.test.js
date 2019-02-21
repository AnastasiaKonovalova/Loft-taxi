import { put, call } from "redux-saga/effects";

import { getCoordsWorker } from './coordsSaga';
import { fetchCoordsSuccess, fetchCoordsFailure } from '../../store/actions';
import { loadCoords } from '../../services/helpers_api';

describe('getCoordsWorker with error', () => {
    const testAction = {
        type: 'FETCH_COORDS_REQUEST',
        payload: {
            address1: 'test1',
            address2: 'test2'
        }
    };
    const gen = getCoordsWorker(testAction);

    it('calls loadCoords with action.payload', () => {
        expect(gen.next().value).toEqual(call(loadCoords, testAction.payload))
    });

    it('puts fetchCoordsFailure with error', () => {
        expect(gen.next({error: 'test error'}).value).toEqual(put(fetchCoordsFailure('test error')))
    });

    it('saga is finished', () => {
        expect(gen.next().done).toEqual(true)
    })
});

describe('getCoordsWorker with success', () => {
    const testAction = {
        type: 'FETCH_COORDS_REQUEST',
        payload: {
            address1: 'test1',
            address2: 'test2'
        }
    };
    const gen = getCoordsWorker(testAction);
    const testCoords = {data: [[30, 50], [40, 60]]};

    it('calls loadCoords with action.payload', () => {
        expect(gen.next().value).toEqual(call(loadCoords, testAction.payload))
    });

    it('puts fetchCoordsSuccess with result', () => {
        expect(gen.next(testCoords).value).toEqual(put(fetchCoordsSuccess(testCoords.data)))
    });

    it('saga is finished', () => {
        expect(gen.next().done).toEqual(true)
    })
})