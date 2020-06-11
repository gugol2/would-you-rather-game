import {
  RECEIVE_QUESTIONS,
  SAVE_ANSWER_TO_QUESTION,
  REMOVE_ANSWER_TO_QUESTION,
  SAVE_QUESTION,
} from '../actions/questions';
import { QuestionsActionTypes, QuestionsState } from '../types';

const initialState: QuestionsState = {};

export const questions = (
  state = initialState,
  action: QuestionsActionTypes,
): QuestionsState => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case SAVE_ANSWER_TO_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      };

    case REMOVE_ANSWER_TO_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.filter(
              (uid: string) => uid !== action.authedUser,
            ),
          },
        },
      };

    case SAVE_QUESTION:
      return {
        ...state,
        [action.qid]: action.question,
      };

    default:
      return state;
  }
};
