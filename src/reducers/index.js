import { combineReducers } from 'redux';
import { users } from './users';
import { questions } from './questions';
import { authedUser } from './authedUser';
import { loadingBarReducer } from 'react-redux-loading';

export const rootReducer = combineReducers({
	users,
	questions,
	authedUser,
	loadingBar: loadingBarReducer
});
