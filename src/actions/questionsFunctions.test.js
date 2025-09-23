import {
  SAVE_QUESTION,
  SAVE_ANSWER_TO_QUESTION,
  REMOVE_ANSWER_TO_QUESTION,
} from './questions';

import {
  handleSaveNewQuestion,
  handleSaveAnswerToQuestion,
} from './questionsFunctions';

import {
  saveQuestion as mockedSaveQuestion,
  saveQuestionAnswer as mockedSaveQuestionAnswer,
} from '../utils/api';

import { showLoading, hideLoading } from 'react-redux-loading-bar';

jest.mock('../utils/api', () => ({
  saveQuestion: jest.fn(),
  saveQuestionAnswer: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  window.alert.mockRestore();
  jest.clearAllMocks();
});

describe('handleSaveAnswerToQuestion should return a function that receives dispatch and getState as parameters', () => {
  test('If the poll is already voted alert a msg', async () => {
    const authedUser = '::authedUser::';
    const qid = '::qid::';
    const answer = '::answer::';
    const users = {
      [authedUser]: { answers: { [qid]: qid } },
    };
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ users }));

    const handleActionFunction = handleSaveAnswerToQuestion({
      authedUser,
      qid,
      answer,
    });

    const saveAnswerToQuestionPromise = await handleActionFunction(
      dispatch,
      getState,
    );

    expect(dispatch).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringMatching(/alredy voted/i),
    );
    expect(saveAnswerToQuestionPromise).toEqual(undefined);
  });

  test('If the poll is NOT voted yet dispatch a SAVE_ANSWER_TO_QUESTION action and also dispatch a REMOVE_ANSWER_TO_QUESTION action because the API fails', async () => {
    mockedSaveQuestionAnswer.mockRejectedValueOnce();

    const authedUser = '::authedUser::';
    const qid = '::qid::';
    const answer = '::answer::';
    const users = {
      [authedUser]: { answers: {} },
    };
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ users }));

    const handleActionFunction = handleSaveAnswerToQuestion({
      authedUser,
      qid,
      answer,
    });

    await handleActionFunction(dispatch, getState);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: SAVE_ANSWER_TO_QUESTION,
      qid,
      answer,
      authedUser,
    });

    expect(mockedSaveQuestionAnswer).toHaveBeenCalledTimes(1);
    expect(mockedSaveQuestionAnswer).toHaveBeenCalledWith({
      authedUser,
      qid,
      answer,
    });

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: REMOVE_ANSWER_TO_QUESTION,
      qid,
      answer,
      authedUser,
    });

    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringMatching(/could not be save/i),
    );
  });

  test('If the poll is NOT voted yet dispatch a SAVE_ANSWER_TO_QUESTION action only because the API succeeds', async () => {
    mockedSaveQuestionAnswer.mockResolvedValueOnce();

    const authedUser = '::authedUser::';
    const qid = '::qid::';
    const answer = '::answer::';
    const users = {
      [authedUser]: { answers: {} },
    };
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ users }));

    const handleActionFunction = handleSaveAnswerToQuestion({
      authedUser,
      qid,
      answer,
    });

    await handleActionFunction(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: SAVE_ANSWER_TO_QUESTION,
      qid,
      answer,
      authedUser,
    });

    expect(mockedSaveQuestionAnswer).toHaveBeenCalledTimes(1);
    expect(mockedSaveQuestionAnswer).toHaveBeenCalledWith({
      authedUser,
      qid,
      answer,
    });

    expect(window.alert).not.toHaveBeenCalled();
  });
});

test('handleSaveNewQuestion should return a function that receives dispatch as parameter', async () => {
  const id = '::id::';
  const question = {
    id,
  };

  mockedSaveQuestion.mockResolvedValueOnce(question);

  const optionOneText = '::optionOneText::';
  const optionTwoText = '::optionTwoText::';
  const author = '::author::';

  const dispatch = jest.fn();

  const handleActionFunction = handleSaveNewQuestion({
    optionOneText,
    optionTwoText,
    author,
  });

  await handleActionFunction(dispatch);

  expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());

  expect(mockedSaveQuestion).toHaveBeenCalledTimes(1);
  expect(mockedSaveQuestion).toHaveBeenCalledWith({
    optionOneText,
    optionTwoText,
    author,
  });

  expect(dispatch).toHaveBeenNthCalledWith(2, {
    type: SAVE_QUESTION,
    question,
    qid: question.id,
  });

  expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
  expect(dispatch).toHaveBeenCalledTimes(3);
});
