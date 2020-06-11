import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from '../actions/authedUser';
import { AuthedUsersActionTypes, AuthedUserState } from '../types';

const initialState: AuthedUserState = null;

export const authedUser = (
  state = initialState,
  action: AuthedUsersActionTypes,
): AuthedUserState => {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;

    case LOGOUT_AUTHED_USER:
      return null;

    default:
      return state;
  }
};
