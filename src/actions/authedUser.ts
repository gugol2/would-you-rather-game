export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER';

interface AuthedUserAction {
  type: string;
  id?: string;
}

export const setAuthedUser = (id: string): AuthedUserAction => {
  return {
    type: SET_AUTHED_USER,
    id,
  };
};

export const logOutAuthedUser = (): AuthedUserAction => {
  return {
    type: LOGOUT_AUTHED_USER,
  };
};
