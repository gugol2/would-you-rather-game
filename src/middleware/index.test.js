// eslint-disable-next-line no-unused-vars
import { middleware } from '.';
import { applyMiddleware as mockedApplyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger as mockedLogger } from './logger';

jest.mock('redux', () => {
  return {
    ...jest.requireActual('redux'),
    applyMiddleware: jest.fn(() => {}),
  };
});

jest.mock('redux-thunk', () => {
  return {
    default: jest.fn(() => {}),
  };
});

jest.mock('./logger', () => {
  return {
    logger: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test('should call applyMiddleware with thunk and logger', () => {
  expect(mockedApplyMiddleware).toHaveBeenCalledTimes(1);
  expect(mockedApplyMiddleware).toHaveBeenCalledWith(thunk, mockedLogger);
});
