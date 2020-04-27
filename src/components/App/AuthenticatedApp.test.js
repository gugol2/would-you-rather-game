import React from 'react';
import { AuthenticatedApp } from './AuthenticatedApp';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ConnectedPollTabs as MockedPollTabs } from '../PollTabs';
import { ConnectedAddPoll as MockedAddpoll } from '../AddPoll';
import { ConnectedLeaderBoard as MockedLeaderBoard } from '../LeaderBoard';
import { NoMatch as MockedNoMatch } from '../NoMatch';
import { ConnectedPollDetailsContainer as MockedPollDetailsContainer } from '../PollDetailsContainer';
import { Redirect as MockedRedirect } from 'react-router-dom';

jest.mock('../PollTabs', () => ({
  ConnectedPollTabs: jest.fn(() => 'MockedPollTabs'),
}));

jest.mock('../AddPoll', () => ({
  ConnectedAddPoll: jest.fn(() => 'MockedAddpoll'),
}));

jest.mock('../LeaderBoard', () => ({
  ConnectedLeaderBoard: jest.fn(() => 'MockedLeaderBoard'),
}));

jest.mock('../NoMatch', () => ({
  NoMatch: jest.fn(() => 'MockedNoMatch'),
}));

jest.mock('../PollDetailsContainer', () => ({
  ConnectedPollDetailsContainer: jest.fn(() => 'MockedPollDetailsContainer'),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Redirect: jest.fn(() => 'MockedRedirect'),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const context = {};

const renderAuthenticatedApp = initialEntry => {
  const history = createMemoryHistory({ initialEntries: [initialEntry] });
  const utils = render(
    <Router history={history}>
      <AuthenticatedApp />
    </Router>,
  );

  return {
    history,
    utils,
  };
};

test("render the Redirect Component when route is '/login'", () => {
  const previousPathname = '::previousPathname::';
  const entry = {
    pathname: '/login',
    search: '',
    hash: '',
    state: { from: { previousPathname } },
    key: '::key::',
  };

  renderAuthenticatedApp(entry);

  expect(MockedRedirect).toHaveBeenCalledTimes(1);
  expect(MockedRedirect).toHaveBeenCalledWith(
    {
      to: { previousPathname },
    },
    context,
  );
});

test("render the PollTabs Component when route is '/'", () => {
  renderAuthenticatedApp('/');

  expect(MockedPollTabs).toHaveBeenCalledTimes(1);
  expect(MockedPollTabs).toHaveBeenCalledWith({}, context);
});

test("render the AddPoll Component when route is '/add'", () => {
  renderAuthenticatedApp('/add');

  expect(MockedAddpoll).toHaveBeenCalledTimes(1);
  expect(MockedAddpoll).toHaveBeenCalledWith({}, context);
});

test("render the LeaderBoard Component when route is '/leaderboard'", () => {
  renderAuthenticatedApp('/leaderboard');

  expect(MockedLeaderBoard).toHaveBeenCalledTimes(1);
  expect(MockedLeaderBoard).toHaveBeenCalledWith({}, context);
});

test('render the NoMatch Component when route is anythng else', () => {
  renderAuthenticatedApp('/anyroute');

  expect(MockedNoMatch).toHaveBeenCalledTimes(1);
  expect(MockedNoMatch).toHaveBeenCalledWith({}, context);
});

test("render the ConnectedPollDetailsContainer Component when route is '/questions/:question_id'", () => {
  const { history } = renderAuthenticatedApp('/questions/anyquestion');

  expect(MockedPollDetailsContainer).toHaveBeenCalledTimes(1);
  expect(MockedPollDetailsContainer).toHaveBeenCalledWith(
    {
      history,
      match: expect.any(Object),
      location: expect.any(Object),
    },
    context,
  );
});
