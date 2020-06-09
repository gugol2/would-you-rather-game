import { QuestionsState, Question, QuestionsActionTypes } from './types';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER_TO_QUESTION = 'SAVE_ANSWER_TO_QUESTION';
export const REMOVE_ANSWER_TO_QUESTION = 'REMOVE_ANSWER_TO_QUESTION';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export const receiveQuestions = (
  questions: QuestionsState,
): QuestionsActionTypes => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

export const saveAnswerToQuestion = ({
  authedUser,
  qid,
  answer,
}: {
  authedUser: string;
  qid: string;
  answer: string;
}): QuestionsActionTypes => {
  return {
    type: SAVE_ANSWER_TO_QUESTION,
    qid,
    answer,
    authedUser,
  };
};

export const removeAnswerToQuestion = ({
  authedUser,
  qid,
  answer,
}: {
  authedUser: string;
  qid: string;
  answer: string;
}): QuestionsActionTypes => {
  return {
    type: REMOVE_ANSWER_TO_QUESTION,
    qid,
    answer,
    authedUser,
  };
};

export const saveNewQuestion = (question: Question): QuestionsActionTypes => {
  return {
    type: SAVE_QUESTION,
    question,
    qid: question.id,
  };
};
