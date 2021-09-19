import { SET_PRODUCTS, SET_LOADED } from '../constants/actionTypes';

export function setProducts(array) {
    return {
        type: SET_PRODUCTS,
        payload: array
    }
}

export function setLoaded(boolean) {
    return {
        type: SET_LOADED,
        payload: boolean
    }
}
