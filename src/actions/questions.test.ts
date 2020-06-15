import {
  receiveQuestions,
  RECEIVE_QUESTIONS,
  SAVE_QUESTION,
  SAVE_ANSWER_TO_QUESTION,
  REMOVE_ANSWER_TO_QUESTION,
  saveAnswerToQuestion,
  removeAnswerToQuestion,
  saveNewQuestion,
} from './questions';
import { Answer, Question } from '../types';

test('should return a receiveQuestions action', () => {
  const questions = {};
  const action = receiveQuestions(questions);

  expect(action).toEqual({
    type: RECEIVE_QUESTIONS,
    questions,
  });
});

test('should return a saveAnswerToQuestion action', () => {
  const answer = '::answer::' as Answer;
  const authedUser = '::authedUser::';
  const qid = '::qid::';

  const action = saveAnswerToQuestion({ authedUser, qid, answer });

  expect(action).toEqual({
    type: SAVE_ANSWER_TO_QUESTION,
    qid,
    answer,
    authedUser,
  });
});

test('should return a removeAnswerToQuestion action', () => {
  const answer = '::answer::' as Answer;
  const authedUser = '::authedUser::';
  const qid = '::qid::';

  const action = removeAnswerToQuestion({ authedUser, qid, answer });

  expect(action).toEqual({
    type: REMOVE_ANSWER_TO_QUESTION,
    qid,
    answer,
    authedUser,
  });
});

test('should return a saveNewQuestion action', () => {
  const id = '::id::';
  const question = { id } as Question;
  const action = saveNewQuestion(question);

  expect(action).toEqual({
    type: SAVE_QUESTION,
    question,
    qid: question.id,
  });
});
