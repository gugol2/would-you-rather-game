import { setAuthedUser, SET_AUTHED_USER, logOutAuthedUser, LOGOUT_AUTHED_USER } from './authedUser';

test('should return setAuthedUser action', () => {
	const id = '::id::';
	const expected = setAuthedUser(id);

	expect(expected).toEqual({
		id,
		type: SET_AUTHED_USER
	});
});

test('should return logOutAuthedUser action', () => {
	const id = '::id::';
	const expected = logOutAuthedUser(id);

	expect(expected).toEqual({
		type: LOGOUT_AUTHED_USER
	});
});

