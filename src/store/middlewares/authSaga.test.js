import { startSubmit, stopSubmit } from "redux-form";
import { put, call } from "redux-saga/effects";

import { login, testAuth } from '../../store/actions';
import { checkAuth } from '../../services/helpers_api';
import { authWorker, authPostWorker } from './authSaga';

describe('authPostWorker', () => {
    const testAction = {
        type: 'TEST_AUTH',
        payload: {
            username: 'test username',
            password: 'test password'
        }
    };
    const gen = authPostWorker(testAction);

    it('calls loadCoords with action.payload', () => {
        expect(gen.next().value).toEqual(call(checkAuth, testAction.payload))
    });

    it('saga is finished', () => {
        expect(gen.next().done).toEqual(true)
    })
});

describe('authWorker with net error', () => {
    const gen = authWorker(testAuth);
    const testError = {error: 'test error'};
    const netErrorTemplate = {
        userName: 'Ошибка сети', 
        userPassword: 'Ошибка сети', 
    _error: testError.error
    };

    it('puts startSubmit', () => {
        expect(gen.next().value).toEqual(put(startSubmit('loginform')))
    });

    it('calls authPostWorker', () => {
        expect(gen.next().value).toEqual(call(authPostWorker, testAuth))
    });

    it('puts stopSubmit with error', () => {
        expect(gen.next(testError).value).toEqual(put(stopSubmit('loginform', netErrorTemplate)))
    });

    it('saga is finished', () => {
        expect(gen.next().done).toEqual(true)
    })
});
describe('authWorker with server error', () => {
    const gen = authWorker(testAuth);
    const testError = {data: {error: 'test error'}};
    const errorTemplate = {
        userName: 'Неверное имя пользователя или пароль', 
        userPassword: 'Неверное имя пользователя или пароль', 
        _error: testError.data.error
    };

    it('puts startSubmit', () => {
        expect(gen.next().value).toEqual(put(startSubmit('loginform')))
    });

    it('calls authPostWorker', () => {
        expect(gen.next().value).toEqual(call(authPostWorker, testAuth))
    });

    it('puts stopSubmit with error', () => {
        expect(gen.next(testError).value).toEqual(put(stopSubmit('loginform', errorTemplate)))
    });

    it('saga is finished', () => {
        expect(gen.next().done).toEqual(true)
    })
});

describe('authWorker with success', () => {
    const gen = authWorker(testAuth);
    const testSuccess = { data: {success: true} };

    it('puts startSubmit', () => {
        expect(gen.next().value).toEqual(put(startSubmit('loginform')))
    });

    it('calls authPostWorker', () => {
        expect(gen.next().value).toEqual(call(authPostWorker, testAuth))
    });

    it('puts stopSubmit with error', () => {
        expect(gen.next(testSuccess).value).toEqual(put(login()))
    });

    it('saga is finished', () => {
        expect(gen.next().done).toEqual(true)
    })
})