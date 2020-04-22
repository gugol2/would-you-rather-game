import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { getInitialData } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_DATA = 'RECEIVE_DATA';

export const handleReceiveData = () => {
  return dispatch => {
    dispatch(showLoading());
    getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
};
