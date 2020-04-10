import { _getUsers, _getQuestions } from '../utils/_DATA';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setLoggedUser } from './loggedUser';

export const RECEIVE_DATA = 'RECEIVE_DATA';

const LOGGED_USER = 'johndoe';

export const handleReceiveData = () => {
    return (dispatch) => {
        Promise.all([_getUsers, _getQuestions]).then(([users, questions]) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(setLoggedUser(LOGGED_USER))
        });

    }
}