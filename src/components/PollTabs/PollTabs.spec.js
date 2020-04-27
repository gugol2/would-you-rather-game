import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PollTabs } from './PollTabs';

jest.mock('../PollBrief', () => {
  return {
    PollBrief: () => 'PollBrief Component',
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test('should show the PollTabs component with the unaswered tab selected by default', () => {
  const unAnsweredQuestions = [];
  const answeredQuestions = [];
  const users = {};

  const props = { unAnsweredQuestions, answeredQuestions, users };

  const { getByTestId, getByText, getByRole } = render(<PollTabs {...props} />);
  const pollTabsRendered = getByTestId('poll-tabs');
  expect(pollTabsRendered).toBeInTheDocument();
  const unansweredTab = getByText(/unanswered questions/i);
  const answeredTab = getByText(/Answered Questions/);
  const message = getByRole('alert');

  expect(unansweredTab).toHaveClass('active');
  expect(answeredTab).not.toHaveClass('active');
  expect(message).toBeInTheDocument();
});

test('should toggle the class active in the tabs when clicking on an tab', () => {
  const unAnsweredQuestions = [{ id: '::unAnsweredQuestionsId::' }];
  const answeredQuestions = [];
  const users = {};

  const props = { unAnsweredQuestions, answeredQuestions, users };

  const { getByText, queryByRole, getByRole } = render(<PollTabs {...props} />);
  const unansweredTab = getByText(/unanswered questions/i);
  const answeredTab = getByText(/Answered Questions/);
  const unAnsweredPollsMessage = queryByRole('alert');
  expect(unansweredTab).toHaveClass('active');
  expect(answeredTab).not.toHaveClass('active');
  expect(unAnsweredPollsMessage).toBeNull();

  // click on the answered tab
  fireEvent.click(answeredTab);
  expect(unansweredTab).not.toHaveClass('active');
  expect(answeredTab).toHaveClass('active');
  const answeredPollsMessage = getByRole('alert');
  expect(answeredPollsMessage).toBeInTheDocument();
});
