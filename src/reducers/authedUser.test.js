import { authedUser } from './authedUser';
import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from '../actions/authedUser';

test('should return the action.id as state when action.type is SET_AUTHED_USER', () => {
  const id = '::id::';
  const initialState = null;

  const action = {
    id,
    type: SET_AUTHED_USER,
  };

  const newState = authedUser(initialState, action);
  expect(newState).toBe(id);
});

test('should return null as state when action.type is LOGOUT_AUTHED_USER', () => {
  const id = '::id::';
  const initialState = null;

  const action = {
    id,
    type: LOGOUT_AUTHED_USER,
  };

  const newState = authedUser(initialState, action);
  expect(newState).toBe(null);
});

test('should return the default state when action.type is not a valid action', () => {
  const id = '::id::';
  const initialState = '::state::';

  const action = {
    id,
    type: '::type::',
  };

  const newState = authedUser(initialState, action);
  expect(newState).toBe(initialState);
});

test('should return null as state when state is undefined and the action.type is not a valid action', () => {
  const id = '::id::';
  const initialState = undefined;

  const action = {
    id,
    type: '::type::',
  };

  const newState = authedUser(initialState, action);
  expect(newState).toBe(null);
});
