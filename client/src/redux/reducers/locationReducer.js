import { SET_CURRENT_TAB } from '../constants/actionTypes';

const initialState = {
  currentPage: 'Main'
};

export default function locationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_TAB:
            return {
              ...state, currentPage: action.payload
            }
        default:
            return state
    }
}