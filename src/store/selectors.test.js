import rootReducer from './reducers';
import {
    getIsLoggedIn,
    getProfile,
    getIsProfileFilled,
    getIsLoadingAddresses,
    getLoadErrorText,
    getMyAddresses,
    getIsLoadingCoords,
    getCoordsError,
    getCoords,
    getIsOrderMade
} from './selectors';

describe('Selectors return right state fields', () => {
    const testStore = rootReducer(undefined, 'test');


    it('getIsLoggedIn returns isLoggedIn - false', () => {
        expect(getIsLoggedIn(testStore)).toBeFalsy()
    });

    it('getProfile returns {}', () => {
        expect(getProfile(testStore)).toEqual({})
    });

    it('getIsProfileFilled returns false', () => {
        expect(getIsProfileFilled(testStore)).toBeFalsy()
    });

    it('getIsLoadingAddresses returns null isLoadingAddresses', () => {
        expect(getIsLoadingAddresses(testStore)).toBe(null)
    });

    it('getLoadErrorText returns null errorText', () => {
        expect(getLoadErrorText(testStore)).toBe(null)
    });

    it('getMyAddresses returns myAddresses - []', () => {
        expect(getMyAddresses(testStore)).toEqual([])
    });

    it('getIsLoadingCoords returns isLoadingCoords -false', () => {
        expect(getIsLoadingCoords(testStore)).toBeFalsy()
    });

    it('getCoordsError returns error - null', () => {
        expect(getCoordsError(testStore)).toBe(null)
    });

    it('getCoords returns coords - null', () => {
        expect(getCoords(testStore)).toBe(null)
    });

    it('getIsOrderMade returns isOrderMade - null', () => {
        expect(getIsOrderMade(testStore)).toBe(false)
    })
})