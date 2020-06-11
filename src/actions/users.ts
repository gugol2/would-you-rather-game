import { ReceiveUsersAction, UsersState } from '../types';

export const RECEIVE_USERS = 'RECEIVE_USERS';

export const receiveUsers = (users: UsersState): ReceiveUsersAction => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};
