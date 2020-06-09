import {
  saveAnswerToQuestion,
  removeAnswerToQuestion,
  saveNewQuestion,
} from './questions';
import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const handleSaveAnswerToQuestion = ({ authedUser, qid, answer }) => {
  return (dispatch, getState) => {
    const { users } = getState();

    const pollAlreadyVoted = Object.prototype.hasOwnProperty.call(
      users[authedUser].answers,
      qid,
    );

    if (!pollAlreadyVoted) {
      // Answer question optimistically
      dispatch(saveAnswerToQuestion({ authedUser, qid, answer }));

      return saveQuestionAnswer({ authedUser, qid, answer }).catch(() => {
        dispatch(removeAnswerToQuestion({ authedUser, qid, answer }));
        alert('Your answer could not be save, please try again!!');
      });
    } else {
      alert('You alredy voted this poll my friend, try another poll!!');
      return Promise.resolve({ authedUser, qid, answer });
    }
  };
};

export const handleSaveNewQuestion = ({
  optionOneText,
  optionTwoText,
  author,
}) => {
  return dispatch => {
    dispatch(showLoading());
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(saveNewQuestion(question));
        dispatch(hideLoading());
      },
    );
  };
};
