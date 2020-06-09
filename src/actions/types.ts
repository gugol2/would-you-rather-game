import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from './authedUser';

interface SetAuthedUserAction {
  type: typeof SET_AUTHED_USER;
  id: string;
}

interface LogOutAuthedUserAction {
  type: typeof LOGOUT_AUTHED_USER;
}

export type AuthedUsersActionTypes =
  | SetAuthedUserAction
  | LogOutAuthedUserAction;
