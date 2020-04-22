import {
  setAuthedUser,
  SET_AUTHED_USER,
  logOutAuthedUser,
  LOGOUT_AUTHED_USER,
} from './authedUser';

test('should return setAuthedUser action', () => {
  const id = '::id::';
  const action = setAuthedUser(id);

  expect(action).toEqual({
    id,
    type: SET_AUTHED_USER,
  });
});

test('should return logOutAuthedUser action', () => {
  const id = '::id::';
  const action = logOutAuthedUser(id);

  expect(action).toEqual({
    type: LOGOUT_AUTHED_USER,
  });
});
