import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PollTabs } from './PollTabs';
import { PollBrief as MockedPollBrief } from '../PollBrief';

// jest.mock('../PollBrief', () => ({
//   PollBrief: jest.fn(() => 'PollBrief Component'),
// }));

jest.mock('../PollBrief');

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
  fireEvent.click(answeredTab);
  fireEvent.click(unansweredTab);

  expect(unansweredTab).toHaveClass('active');
  expect(answeredTab).not.toHaveClass('active');
  expect(message).toBeInTheDocument();
});

test('should toggle the class active in the tabs when clicking on an tab', () => {
  MockedPollBrief.mockReturnValue('PollBrief Component');
  const author = '::author::';
  const unAnsweredQuestions = [{ id: '::unAnsweredQuestionsId::', author }];
  const answeredQuestions = [];
  const users = { [author]: author };

  const props = { unAnsweredQuestions, answeredQuestions, users };

  const { getByText, queryByRole, getByRole } = render(<PollTabs {...props} />);
  const unansweredTab = getByText(/unanswered questions/i);
  const answeredTab = getByText(/Answered Questions/);
  const unAnsweredPollsMessage = queryByRole('alert');
  expect(unansweredTab).toHaveClass('active');
  expect(answeredTab).not.toHaveClass('active');
  expect(MockedPollBrief).toHaveBeenCalledWith(
    {
      qauthor: '::author::',
      question: { author: '::author::', id: '::unAnsweredQuestionsId::' },
    },
    {},
  );
  expect(MockedPollBrief).toHaveBeenCalledTimes(1);

  expect(unAnsweredPollsMessage).toBeNull();

  // click on the answered tab
  MockedPollBrief.mockClear();
  fireEvent.click(answeredTab);

  const answeredPollsMessage = getByRole('alert');

  expect(unansweredTab).not.toHaveClass('active');
  expect(answeredTab).toHaveClass('active');
  expect(MockedPollBrief).not.toHaveBeenCalled();
  expect(answeredPollsMessage).toBeInTheDocument();
});
