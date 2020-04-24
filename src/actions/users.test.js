import { receiveUsers, RECEIVE_USERS } from './users';

test('should return a receiveUsers action object', () => {
  const users = '::users::';

  const actionObject = receiveUsers(users);

  expect(actionObject).toEqual({
    type: RECEIVE_USERS,
    users,
  });
});
