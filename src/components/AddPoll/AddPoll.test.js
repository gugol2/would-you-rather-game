import { waitFor, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  renderWithRouter(
    <AddPoll
      dispatchSaveNewQuestion={dispatchSaveNewQuestion}
      authedUser={authedUser}
    />,
  );

  const addPollRendered = screen.getByTestId('addpoll');
  expect(addPollRendered).toBeInTheDocument();

  const inputOptionOne = screen.getByTestId('optionOneText');
  const inputOptionTwo = screen.getByTestId('optionTwoText');
  const submitPoll = screen.getByTestId('submitpoll');

  expect(inputOptionOne.value).toBe('');
  expect(inputOptionTwo.value).toBe('');
  expect(submitPoll.disabled).toBe(true);
});

test('should add a poll', async () => {
  const dispatchSaveNewQuestion = jest.fn(() => Promise.resolve());
  const authedUser = '::authedUser::';
  const optionOneText = '::optionOneText::';
  const optionTwoText = '::optionTwoText::';

  renderWithRouter(
    <AddPoll
      dispatchSaveNewQuestion={dispatchSaveNewQuestion}
      authedUser={authedUser}
    />,
  );

  const addPollRendered = screen.getByTestId('addpoll');
  expect(addPollRendered).toBeInTheDocument();

  const inputOptionOne = screen.getByTestId('optionOneText');
  const inputOptionTwo = screen.getByTestId('optionTwoText');
  const submitPoll = screen.getByTestId('submitpoll');

  // Fill the inputs
  expect(submitPoll).toBeDisabled();
  await userEvent.type(inputOptionOne, optionOneText);
  expect(submitPoll).toBeDisabled();
  await userEvent.type(inputOptionTwo, optionTwoText);
  expect(submitPoll).not.toBeDisabled();

  expect(inputOptionOne.value).toBe(optionOneText);
  expect(inputOptionTwo.value).toBe(optionTwoText);

  // Submit the poll
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.click(submitPoll);
  });

  expect(dispatchSaveNewQuestion).toHaveBeenCalled();
  expect(dispatchSaveNewQuestion).toHaveBeenCalledTimes(1);
  expect(dispatchSaveNewQuestion).toHaveBeenCalledWith({
    author: authedUser,
    optionOneText,
    optionTwoText,
  });

  // Wait for the form to reset after submission
  await waitFor(() => expect(inputOptionOne.value).toBe(''));
  await waitFor(() => expect(inputOptionTwo.value).toBe(''));

  // Go to /
  expect(mockHistoryPush).toHaveBeenCalled();
  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});
