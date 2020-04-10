import { combineReducers } from "redux";
import { users } from './users';
import { questions } from './questions';
import { loggedUser } from './loggedUser';

export const rootReducer = () => {
    return combineReducers({
        users,
        questions,
        loggedUser
    })
};