import {login, logout, handleProfileSubmit, handleProfileClear} from '../actions';

import authReducer from './authReducer';

describe('LOGIN makes store.isLoggedIn to be true', () => {
    const initialState = authReducer(undefined, 'test');
    const testState = authReducer(initialState, login());

    it('creates valid initialStore', () => {
        expect(Object.keys(initialState)).toContain(
            'isLoggedIn',
            'profile'
        )
    });

    it('isLoggedIn in store must be true', () => {
        expect(testState.isLoggedIn).toBeTruthy()
    })
});

describe('LOGOUT makes store.isLoggedIn to be false', () => {
    const initialState = authReducer(undefined, 'test');
    const testState = authReducer(initialState, logout());

    it('isLoggedIn in store must be false', () => {
        expect(testState.isLoggedIn).toBeFalsy()
    })
});

describe('HANDLE_PROFILE_SUBMIT saves profile details to store', () => {
    const initialState = authReducer(undefined, 'test');
    const testProfile1 = {
        cardName: 'test',
        cardNumber: '1111222233334444',
        expDate: '01.01.2020',
        cvv: '123'
    }
    const testState = authReducer(initialState, handleProfileSubmit({profile: {...testProfile1}}));

    it('store.profile must have fields: cardName, cardNumber, expDate, cvv', () => {
        expect(testState.profile).toStrictEqual(testProfile1);
    })
});

describe('HANDLE_PROFILE_CLEAR profile to empty object in store', () => {
    const initialState = authReducer(undefined, 'test');
    const testState = authReducer(initialState, handleProfileClear());

    it('store.profile must be empty object', () => {
        expect(testState.profile).toStrictEqual({})
    })
});