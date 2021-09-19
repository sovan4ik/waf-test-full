import { SET_PRODUCTS, SET_LOADED } from '../constants/actionTypes';

const initialState = {
  products: [],
  isLoaded: false
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
              ...state, products: action.payload
            }
        case SET_LOADED:
            return {
                ...state, isLoaded: action.payload
            }
        default:
            return state
    }
}
