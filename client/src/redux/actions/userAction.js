import { SET_IS_AUTH, SET_USER } from '../constants/actionTypes';

export function setIsAuth(boolean) {
    return {
      type: SET_IS_AUTH,
      payload: boolean
    }
  }

export function setUser(user) {
return {
    type: SET_USER,
    payload: user
}
}