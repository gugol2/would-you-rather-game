import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PollTabs } from './PollTabs';

/* eslint-disable react/prop-types */

jest.mock('../PollBrief', () => ({
  PollBrief: ({ question, qauthor }) => (
    <div
      data-testid='mocked-poll-brief'
      data-question={JSON.stringify(question)}
      data-qauthor={JSON.stringify(qauthor)}
    >
      Mocked PollBrief Component
    </div>
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderPollTabs = props => {
  const utils = render(<PollTabs {...props} />);
  const pollTabsRendered = screen.getByTestId('poll-tabs');
  const unansweredTab = screen.getByText(/unanswered questions/i);
  const answeredTab = screen.getByText(/Answered Questions/);
  const noPollsMessage = screen.queryByRole('alert');

  return {
    ...utils,
    pollTabsRendered,
    unansweredTab,
    answeredTab,
    noPollsMessage,
  };
};

test('should show the PollTabs component with the unaswered tab selected by default', async () => {
  const unAnsweredQuestions = [];
  const answeredQuestions = [];
  const users = {};

  const { pollTabsRendered, unansweredTab, answeredTab, noPollsMessage } =
    renderPollTabs({ unAnsweredQuestions, answeredQuestions, users });

  expect(pollTabsRendered).toBeInTheDocument();
  expect(unansweredTab).toHaveClass('active');
  expect(answeredTab).not.toHaveClass('active');
  expect(noPollsMessage).toBeInTheDocument();

  await userEvent.click(answeredTab);
  expect(unansweredTab).not.toHaveClass('active');
  expect(answeredTab).toHaveClass('active');
  expect(noPollsMessage).toBeInTheDocument();

  await userEvent.click(unansweredTab);
  expect(unansweredTab).toHaveClass('active');
  expect(answeredTab).not.toHaveClass('active');
  expect(noPollsMessage).toBeInTheDocument();
});

test('should toggle the class active in the tabs when clicking on an tab', async () => {
  // MockedPollBrief.mockReturnValue('Mocked PollBrief Component');
  const author = '::author::';
  const unAnsweredQuestions = [
    {
      id: '::unAnsweredQuestionsId::',
      author,
      optionOne: { text: 'Option one text' },
      optionTwo: { text: 'Option two text' },
    },
  ];
  const answeredQuestions = [];
  const users = { [author]: { name: author, avatarURL: 'test.jpg' } };

  let { answeredTab, noPollsMessage } = renderPollTabs({
    unAnsweredQuestions,
    answeredQuestions,
    users,
  });

  expect(answeredTab).not.toHaveClass('active');
  const MockedPollBrief = screen.queryByTestId('mocked-poll-brief');
  expect(MockedPollBrief).toBeInTheDocument();
  expect(MockedPollBrief).toHaveAttribute(
    'data-question',
    JSON.stringify(unAnsweredQuestions[0]),
  );
  expect(MockedPollBrief).toHaveAttribute(
    'data-qauthor',
    JSON.stringify(users[author]),
  );

  expect(noPollsMessage).toBeNull();

  // click on the answered tab
  await userEvent.click(answeredTab);

  // find by queries are asynchronous.
  // They'll continue to query the DOM as DOM changes are made until it can find the element that it's looking for or until a timeout time is reached.
  noPollsMessage = await screen.findByRole('alert');

  expect(MockedPollBrief).not.toBeInTheDocument();
  expect(noPollsMessage).toBeInTheDocument();
});
