import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PollTabs } from './PollTabs';

test('should show the PollTabs component with the unaswered tab selected by default', () => {
  const unAnsweredQuestions = [];
  const answeredQuestions = [];
  const users = {};

  const props = { unAnsweredQuestions, answeredQuestions, users };

  const { getByTestId, getByText } = render(<PollTabs {...props} />);
  const pollTabsRendered = getByTestId('poll-tabs');
  expect(pollTabsRendered).toBeInTheDocument();
  const unansweredTab = getByText(/unanswered questions/i);
  const answeredTab = getByText(/Answered Questions/);
  expect(unansweredTab).toHaveClass('active');
  expect(answeredTab).not.toHaveClass('active');
});

test('should toggle the class active in the tabs when clicking on an tab', () => {
  const unAnsweredQuestions = [];
  const answeredQuestions = [];
  const users = {};

  const props = { unAnsweredQuestions, answeredQuestions, users };

  const { getByText } = render(<PollTabs {...props} />);
  const unansweredTab = getByText(/unanswered questions/i);
  const answeredTab = getByText(/Answered Questions/);
  expect(unansweredTab).toHaveClass('active');
  expect(answeredTab).not.toHaveClass('active');

  // click on the answered tab
  fireEvent.click(answeredTab);
  expect(unansweredTab).not.toHaveClass('active');
  expect(answeredTab).toHaveClass('active');
});
