import { fetchAddressesRequest, fetchAddressesSuccess, fetchAddressesFailure} from '../actions';
import loadAddressesReducer from './loadAddressesReducer';

describe('FETCH_ADDRESSES_REQUEST sets store.isLoadingAddresses to true', () => {
    const initialState = loadAddressesReducer(undefined, 'test');
    const testState = loadAddressesReducer(initialState, fetchAddressesRequest());

    it('creates valid initialStore', () => {
        expect(Object.keys(initialState)).toContain(
            'myAddresses',
            'isLoadingAddresses',
            'error',
            'errorText'
        )
    });

    it('isLoadingAddresses in store must be true', () => {
        expect(testState.isLoadingAddresses).toBeTruthy()
    })
});

describe('FETCH_ADDRESSES_SUCCESS sets store.isLoadingAddresses to false, sets store.myAddresses', () => {
    const initialState = loadAddressesReducer(undefined, 'test');
    const testAdresses = {addresses: ['Пулково (LED)', 'Волковское кладбище']};
    const testState = loadAddressesReducer(initialState, fetchAddressesSuccess(testAdresses));

    it('isLoadingAddresses -> false', () => {
        expect(testState.isLoadingAddresses).toBeFalsy()
    });

    it('sets valid store.myAddresses', () => {
        expect(testState.myAddresses).toStrictEqual(testAdresses)
    });

    it('store.error -> null', () => {
        expect(testState.error).toBe(null)
    })
    it('store.errorText -> null', () => {
        expect(testState.errorText).toBe(null)
    })
});

describe('FETCH_ADDRESSES_FAILURE', () => {
    const initialState = loadAddressesReducer(undefined, 'test');
    const testState = loadAddressesReducer(initialState, fetchAddressesFailure('test error'));

    it('isLoadingAddresses -> false', () => {
        expect(testState.isLoadingAddresses).toBeFalsy()
    });

    it('store.myAddresses -> []', () => {
        expect(testState.myAddresses).toEqual([])
    });

    it('store.error -> test error', () => {
        expect(testState.error).toEqual('test error')
    });

    it('store.errorText -> Ошибка загрузки', () => {
        expect(testState.errorText).toEqual('Ошибка загрузки. Проверьте подключение к сети')
    })
});
