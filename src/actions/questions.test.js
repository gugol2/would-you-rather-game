import {
  receiveQuestions,
  RECEIVE_QUESTIONS,
  handleSaveNewQuestion,
  SAVE_QUESTION,
} from './questions';
import * as api from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

test('should return a receiveQuestions action', () => {
  const questions = '::questions::';
  const action = receiveQuestions(questions);

  expect(action).toEqual({
    type: RECEIVE_QUESTIONS,
    questions,
  });
});

test('handleSaveNewQuestion should return a function that receives dispatch as parameter', () => {
  const optionOneText = '::optionOneText::';
  const optionTwoText = '::optionTwoText::';
  const author = '::author::';
  const question = '::question::';

  //   api.saveQuestion = jest.fn(() => Promise.resolve(question));
  jest.spyOn(api, 'saveQuestion');
  api.saveQuestion.mockImplementation(() => Promise.resolve(question));

  const dispatch = jest.fn();
  console.log('dispatch', dispatch);

  const handleAction = handleSaveNewQuestion({
    optionOneText,
    optionTwoText,
    author,
  });

  const saveQuestion = handleAction(dispatch);

  expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
  expect(api.saveQuestion).toHaveBeenCalledWith({
    optionOneText,
    optionTwoText,
    author,
  });

  saveQuestion.then(() => {
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      question,
      type: SAVE_QUESTION,
    });
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  // cleanup
  api.saveQuestion.mockRestore();
});
