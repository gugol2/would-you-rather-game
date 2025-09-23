import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { getInitialData } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const handleReceiveData = () => {
  return async dispatch => {
    dispatch(showLoading());

    const { users, questions } = await getInitialData();
    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
    dispatch(hideLoading());
  };
};
