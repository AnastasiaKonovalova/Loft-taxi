import { put, call } from "redux-saga/effects";

import { saveCoordsWorker, fetchCoordsWorker } from './coordsSaga';
import { fetchCoordsRequest, fetchCoordsSuccess, fetchCoordsFailure } from '../actions';
import {loadCoords} from '../helpers_api';


describe('fetchCoordsWorker', () => {
    const testAction = {
        type: 'FETCH_COORDS_REQUEST',
        payload: {
            address1: 'test1',
            address2: 'test2'
        }
    };
    const gen = fetchCoordsWorker(testAction);

    it('calls loadCoords with action.payload', () => {
        expect(gen.next().value).toEqual(call(loadCoords, testAction.payload))
    });

    it('saga is finished', () => {
        expect(gen.next().done).toEqual(true)
    })
});

describe('saveCoordsWorker with error', () => {
    const gen = saveCoordsWorker(fetchCoordsRequest);

    it('calls fetchCoordsWorker', () => {
        expect(gen.next().value).toEqual(call(fetchCoordsWorker, fetchCoordsRequest))
    });

    it('puts fetchCoordsFailure with error', () => {
        expect(gen.next({error: 'test error'}).value).toEqual(put(fetchCoordsFailure('test error')))
    });

    it('saga is finished', () => {
        expect(gen.next().done).toEqual(true)
    })
});

describe('saveCoordsWorker with success', () => {
    const gen = saveCoordsWorker(fetchCoordsRequest);
    const testCoords = {coords: [[30, 50], [40, 60]]};

    it('calls fetchCoordsWorker', () => {
        expect(gen.next().value).toEqual(call(fetchCoordsWorker, fetchCoordsRequest))
    });

    it('puts fetchCoordsSuccess with result', () => {
        expect(gen.next(testCoords).value).toEqual(put(fetchCoordsSuccess(testCoords.coords)))
    });

    it('saga is finished', () => {
        expect(gen.next().done).toEqual(true)
    })
})