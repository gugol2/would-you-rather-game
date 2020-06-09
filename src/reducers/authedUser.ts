import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from '../actions/authedUser';
import { AuthedUsersActionTypes } from '../actions/types';

export const authedUser = (state = null, action: AuthedUsersActionTypes) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;

    case LOGOUT_AUTHED_USER:
      return null;

    default:
      return state;
  }
};
