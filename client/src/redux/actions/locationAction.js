import { SET_CURRENT_TAB } from '../constants/actionTypes';

export function setCurrentTab(pageName) {
    return {
      type: SET_CURRENT_TAB,
      payload: pageName
    }
  }