import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { AddPoll } from './AddPoll';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

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

test('should add a poll', () => {
  const dispatchSaveNewQuestion = jest.fn(() => Promise.resolve());
  const authedUser = '::authedUser::';
  const optionOneText = '::optionOneText::';
  const optionTwoText = '::optionTwoText::';

  const { getByTestId, debug } = render(
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
  expect(dispatchSaveNewQuestion).toHaveBeenCalledWith({
    author: authedUser,
    optionOneText,
    optionTwoText,
  });

  //   dispatchSaveNewQuestion.then(() => {
  //     expect(inputOptionOne.value).toBe('');
  //     expect(inputOptionTwo.value).toBe('');
  //   });

  debug(inputOptionOne);
  debug(inputOptionTwo);
  debug(submitPoll);
});
