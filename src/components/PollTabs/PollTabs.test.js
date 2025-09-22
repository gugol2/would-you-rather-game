import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PollTabs } from './PollTabs';
import { PollBrief as MockedPollBrief } from '../PollBrief';

jest.mock('../PollBrief', () => ({
  PollBrief: jest.fn(() => <>Mocked PollBrief Component</>),
}));

// jest.mock('../PollBrief');

afterEach(() => {
  jest.clearAllMocks();
});

const renderPollTabs = props => {
  const utils = render(<PollTabs {...props} />);
  const pollTabsRendered = utils.getByTestId('poll-tabs');
  const unansweredTab = utils.getByText(/unanswered questions/i);
  const answeredTab = utils.getByText(/Answered Questions/);
  const noPollsMessage = utils.queryByRole('alert');

  return {
    ...utils,
    pollTabsRendered,
    unansweredTab,
    answeredTab,
    noPollsMessage,
  };
};

test('should show the PollTabs component with the unaswered tab selected by default', () => {
  const unAnsweredQuestions = [];
  const answeredQuestions = [];
  const users = {};

  const { pollTabsRendered, unansweredTab, answeredTab, noPollsMessage } =
    renderPollTabs({ unAnsweredQuestions, answeredQuestions, users });

  expect(pollTabsRendered).toBeInTheDocument();
  expect(unansweredTab).toHaveClass('active');
  expect(answeredTab).not.toHaveClass('active');
  expect(noPollsMessage).toBeInTheDocument();

  fireEvent.click(answeredTab);
  expect(unansweredTab).not.toHaveClass('active');
  expect(answeredTab).toHaveClass('active');
  expect(noPollsMessage).toBeInTheDocument();

  fireEvent.click(unansweredTab);
  expect(unansweredTab).toHaveClass('active');
  expect(answeredTab).not.toHaveClass('active');
  expect(noPollsMessage).toBeInTheDocument();
});

test('should toggle the class active in the tabs when clicking on an tab', async () => {
  // MockedPollBrief.mockReturnValue('Mocked PollBrief Component');
  const author = '::author::';
  const unAnsweredQuestions = [{ id: '::unAnsweredQuestionsId::', author }];
  const answeredQuestions = [];
  const users = { [author]: author };

  let { answeredTab, findByRole, noPollsMessage } = renderPollTabs({
    unAnsweredQuestions,
    answeredQuestions,
    users,
  });

  expect(MockedPollBrief).toHaveBeenCalledWith(
    {
      qauthor: '::author::',
      question: { author: '::author::', id: '::unAnsweredQuestionsId::' },
    },
    {},
  );
  expect(MockedPollBrief).toHaveBeenCalledTimes(1);
  expect(noPollsMessage).toBeNull();

  // click on the answered tab
  MockedPollBrief.mockClear();
  fireEvent.click(answeredTab);

  // find by queries are asynchronous.
  // They'll continue to query the DOM as DOM changes are made until it can find the element that it's looking for or until a timeout time is reached.
  noPollsMessage = await findByRole('alert');

  expect(MockedPollBrief).not.toHaveBeenCalled();
  expect(noPollsMessage).toBeInTheDocument();
});
