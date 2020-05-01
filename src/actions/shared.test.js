import { handleReceiveData } from './shared';
import { getInitialData as mockedGetInitialData } from '../utils/api';
import { RECEIVE_USERS } from '../actions/users';
import { RECEIVE_QUESTIONS } from '../actions/questions';

jest.mock('../utils/api', () => ({
  getInitialData: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('handleReceiveData', () => {
  const showLoadingAction = {
    payload: { scope: 'default' },
    type: 'loading-bar/SHOW',
  };
  const hideLoadingAction = {
    payload: { scope: 'default' },
    type: 'loading-bar/HIDE',
  };
  const dispatch = jest.fn();
  const users = '::users::';
  const questions = '::questions::';

  test('should dispatch showLoading, receiveUsers, receiveQuestions and hideLoading in that order when the API succeeds', async () => {
    mockedGetInitialData.mockImplementation(() =>
      Promise.resolve({ users, questions }),
    );

    const receiveData = handleReceiveData();

    await receiveData(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoadingAction);
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: RECEIVE_USERS,
      users,
    });
    expect(dispatch).toHaveBeenNthCalledWith(3, {
      type: RECEIVE_QUESTIONS,
      questions,
    });
    expect(dispatch).toHaveBeenNthCalledWith(4, hideLoadingAction);
  });

  test('should dispatch ONLY showLoading when the API fails', async () => {
    mockedGetInitialData.mockImplementation(() => Promise.reject('API failed'));

    const receiveData = handleReceiveData();

    await receiveData(dispatch).catch(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(showLoadingAction);
    });
  });
});
