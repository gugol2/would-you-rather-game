import { AuthedUsersActionTypes } from './types';
export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER';

export const setAuthedUser = (id: string): AuthedUsersActionTypes => {
  return {
    type: SET_AUTHED_USER,
    id,
  };
};

export const logOutAuthedUser = (): AuthedUsersActionTypes => {
  return {
    type: LOGOUT_AUTHED_USER,
  };
};
