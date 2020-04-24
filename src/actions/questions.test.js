import { receiveQuestions, RECEIVE_QUESTIONS } from './questions';

test('should return a receiveQuestions action', () => {
  const questions = '::questions::';
  const action = receiveQuestions(questions);

  expect(action).toEqual({
    type: RECEIVE_QUESTIONS,
    questions,
  });
});
