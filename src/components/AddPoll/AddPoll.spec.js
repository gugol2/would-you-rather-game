import { render, wait } from '@testing-library/react';
import user from '@testing-library/user-event';
import { AddPoll } from './AddPoll';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('should render the AddPoll Component', () => {
  const dispatchSaveNewQuestion = () => {};
  const authedUser = '::authedUser::';

  const { getByTestId } = render(
    <AddPoll
      dispatchSaveNewQuestion={dispatchSaveNewQuestion}
      authedUser={authedUser}
    />,
    { wrapper: BrowserRouter },
  );

  const addPollRendered = getByTestId('addpoll');
  expect(addPollRendered).toBeInTheDocument();

  const inputOptionOne = getByTestId('optionOneText');
  const inputOptionTwo = getByTestId('optionTwoText');
  const submitPoll = getByTestId('submitpoll');

  expect(inputOptionOne.value).toBe('');
  expect(inputOptionTwo.value).toBe('');
  expect(submitPoll.disabled).toBe(true);
});

test('should add a poll', async () => {
  const dispatchSaveNewQuestion = jest.fn(() => Promise.resolve());
  const authedUser = '::authedUser::';
  const optionOneText = '::optionOneText::';
  const optionTwoText = '::optionTwoText::';

  const { getByTestId } = render(
    <AddPoll
      dispatchSaveNewQuestion={dispatchSaveNewQuestion}
      authedUser={authedUser}
    />,
    { wrapper: BrowserRouter },
  );

  const addPollRendered = getByTestId('addpoll');
  expect(addPollRendered).toBeInTheDocument();

  const inputOptionOne = getByTestId('optionOneText');
  const inputOptionTwo = getByTestId('optionTwoText');
  const submitPoll = getByTestId('submitpoll');

  expect(submitPoll.disabled).toBe(true);
  user.type(inputOptionOne, optionOneText);
  expect(submitPoll.disabled).toBe(true);
  user.type(inputOptionTwo, optionTwoText);
  expect(submitPoll.disabled).toBe(false);

  expect(inputOptionOne.value).toBe(optionOneText);
  expect(inputOptionTwo.value).toBe(optionTwoText);

  user.click(submitPoll);

  expect(dispatchSaveNewQuestion).toHaveBeenCalled();
  expect(dispatchSaveNewQuestion).toHaveBeenCalledTimes(1);
  expect(dispatchSaveNewQuestion).toHaveBeenCalledWith({
    author: authedUser,
    optionOneText,
    optionTwoText,
  });

  await wait(() => {
    expect(inputOptionOne.value).toBe('');
    expect(inputOptionTwo.value).toBe('');
  });

  expect(mockHistoryPush).toHaveBeenCalled();
  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});
