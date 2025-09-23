import {
  saveAnswerToQuestion,
  removeAnswerToQuestion,
  saveNewQuestion,
} from './questions';
import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  Answer,
  AppDispatch,
  AppGetState,
  QuestionsActionTypes,
} from '../types';

export const handleSaveAnswerToQuestion = ({
  authedUser,
  qid,
  answer,
}: {
  authedUser: string;
  qid: string;
  answer: Answer;
}) => {
  return async (
    dispatch: (action: QuestionsActionTypes) => void,
    getState: AppGetState,
  ): Promise<void> => {
    const { users } = getState();

    const pollAlreadyVoted = Object.prototype.hasOwnProperty.call(
      users[authedUser].answers,
      qid,
    );

    if (!pollAlreadyVoted) {
      // Answer question optimistically
      dispatch(saveAnswerToQuestion({ authedUser, qid, answer }));

      try {
        await saveQuestionAnswer({ authedUser, qid, answer });
      } catch (e) {
        dispatch(removeAnswerToQuestion({ authedUser, qid, answer }));
        alert('Your answer could not be save, please try again!!');
      }
    } else {
      alert('You alredy voted this poll my friend, try another poll!!');
    }
  };
};

export const handleSaveNewQuestion = ({
  optionOneText,
  optionTwoText,
  author,
}: {
  optionOneText: string;
  optionTwoText: string;
  author: string;
}) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(showLoading());
    const question = await saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    });
    dispatch(saveNewQuestion(question));
    dispatch(hideLoading());
  };
};
