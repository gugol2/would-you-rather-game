import { waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import React from 'react';
import { renderWithRouter } from '../../testHelpers/renderWithRouter';
import { AddPoll } from './AddPoll';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
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

  const { getByTestId } = renderWithRouter(
    <AddPoll
      dispatchSaveNewQuestion={dispatchSaveNewQuestion}
      authedUser={authedUser}
    />,
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

  const { getByTestId } = renderWithRouter(
    <AddPoll
      dispatchSaveNewQuestion={dispatchSaveNewQuestion}
      authedUser={authedUser}
    />,
  );

  const addPollRendered = getByTestId('addpoll');
  expect(addPollRendered).toBeInTheDocument();

  const inputOptionOne = getByTestId('optionOneText');
  const inputOptionTwo = getByTestId('optionTwoText');
  const submitPoll = getByTestId('submitpoll');

  // Fill the inputs
  expect(submitPoll).toBeDisabled();
  user.type(inputOptionOne, optionOneText);
  expect(submitPoll).toBeDisabled();
  user.type(inputOptionTwo, optionTwoText);
  expect(submitPoll).not.toBeDisabled();

  expect(inputOptionOne.value).toBe(optionOneText);
  expect(inputOptionTwo.value).toBe(optionTwoText);

  // Submit the poll
  user.click(submitPoll);

  expect(dispatchSaveNewQuestion).toHaveBeenCalled();
  expect(dispatchSaveNewQuestion).toHaveBeenCalledTimes(1);
  expect(dispatchSaveNewQuestion).toHaveBeenCalledWith({
    author: authedUser,
    optionOneText,
    optionTwoText,
  });

  // Reset the form
  await waitFor(() => {
    expect(inputOptionOne.value).toBe('');
    expect(inputOptionTwo.value).toBe('');
  });

  // Go to /
  expect(mockHistoryPush).toHaveBeenCalled();
  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});
