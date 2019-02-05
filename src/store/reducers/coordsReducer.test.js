import {fetchCoordsRequest, fetchCoordsSuccess, fetchCoordsFailure, setIsOrderMade} from '../actions';
import coordsReducer from './coordsReducer';

describe('FETCH_COORDS_REQUEST sets store.isLoadingCoords to true', () => {
    const initialState = coordsReducer(undefined, 'test');
    const testState = coordsReducer(initialState, fetchCoordsRequest({test: 'test'}));

    it('creates valid initialStore', () => {
        expect(Object.keys(initialState)).toContain(
            'isLoadingCoords',
            'error',
            'coords',
            'isOrderMade'
        )
    });

    it('isLoadingCoords in store must be true', () => {
        expect(testState.isLoadingCoords).toBeTruthy()
    })
});

describe('FETCH_COORDS_SUCCESS sets store.isLoadingCoord to false, sets store.coords', () => {
    const initialState = coordsReducer(undefined, 'test');
    const testCoords = [[30, 50], [40, 60]];
    const testState = coordsReducer(initialState, fetchCoordsSuccess(testCoords));

    it('isLoadingCoords -> false', () => {
        expect(testState.isLoadingCoords).toBeFalsy()
    });

    it('sets valid store.coords', () => {
        expect(testState.coords).toStrictEqual(testCoords)
    });

    it('store.error -> null', () => {
        expect(testState.error).toBe(null)
    })
});

describe('FETCH_COORDS_FAILURE', () => {
    const initialState = coordsReducer(undefined, 'test');
    const testState = coordsReducer(initialState, fetchCoordsFailure('test'));

    it('isLoadingCoords -> false', () => {
        expect(testState.isLoadingCoords).toBeFalsy()
    });

    it('store.coords -> null', () => {
        expect(testState.coords).toBe(null)
    });

    it('store.error -> test', () => {
        expect(testState.error).toEqual('test')
    })
});

describe('IS_ORDER_MADE_SET sets store.isOrderMade', () => {
    const initialState = coordsReducer(undefined, 'test');
    const testState = coordsReducer(initialState, setIsOrderMade(true));

    it('isOrderMade in store must be true', () => {
        expect(testState.isOrderMade).toBeTruthy()
    });

    const testState2 = coordsReducer(testState, setIsOrderMade(false));

    it('isOrderMade in store must be false', () => {
        expect(testState2.isOrderMade).toBeFalsy()
    })

});
