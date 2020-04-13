// import { receiveUsers } from './users';
// import { receiveQuestions } from './questions';
import { setAuthedUser } from './authedUser';
import { getInitialData } from '../utils/api';

export const RECEIVE_DATA = 'RECEIVE_DATA';

const LOGGED_USER = 'johndoe';

export const handleReceiveData = () => {
    return (dispatch) => {
        getInitialData().then(({users, questions}) => {
            // dispatch(receiveUsers(users));
            // dispatch(receiveQuestions(questions));
            dispatch(setAuthedUser(LOGGED_USER))
        });

    }
}

// TODO: Delete this file