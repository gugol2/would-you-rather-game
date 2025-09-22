import React from 'react';
import { AuthenticatedApp } from './AuthenticatedApp';
import { renderWithRouter } from '../../setupTests';

/* eslint-disable react/prop-types */

jest.mock('../PollTabs', () => ({
  ConnectedPollTabs: () => (
    <div data-testid='mocked-poll-tabs'>MockedPollTabs</div>
  ),
}));

jest.mock('../AddPoll', () => ({
  ConnectedAddPoll: () => (
    <div data-testid='mocked-add-poll'>MockedAddpoll</div>
  ),
}));

jest.mock('../LeaderBoard', () => ({
  ConnectedLeaderBoard: () => (
    <div data-testid='mocked-leaderboard'>MockedLeaderBoard</div>
  ),
}));

jest.mock('../NoMatch', () => ({
  NoMatch: () => <div data-testid='mocked-no-match'>MockedNoMatch</div>,
}));

jest.mock('../PollDetailsContainer', () => ({
  ConnectedPollDetailsContainer: () => (
    <div data-testid='mocked-poll-details-container'>
      MockedPollDetailsContainer
    </div>
  ),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Redirect: ({ to }) => (
    <div data-testid='mocked-redirect' data-to={JSON.stringify(to)}>
      MockedRedirect
    </div>
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderAuthenticatedApp = initialEntry => {
  return renderWithRouter(<AuthenticatedApp />, {
    route: initialEntry,
  });
};

test("render the Redirect Component when route is '/login' with the pathname from location.state", () => {
  const previousPathname = '::previousPathname::';

  const entry = {
    pathname: '/login',
    search: '',
    hash: '',
    state: { from: { pathname: previousPathname } },
    key: '::key::',
  };

  const { queryAllByTestId } = renderAuthenticatedApp(entry);

  const MockedRedirect = queryAllByTestId('mocked-redirect');
  expect(MockedRedirect).toHaveLength(1);
  expect(MockedRedirect[0]).toHaveAttribute(
    'data-to',
    JSON.stringify({
      pathname: previousPathname,
    }),
  );
});

test("render the Redirect Component when route is '/login' with '/' as pathname", () => {
  const { queryAllByTestId } = renderAuthenticatedApp('/login');

  const MockedRedirect = queryAllByTestId('mocked-redirect');
  expect(MockedRedirect).toHaveLength(1);
  expect(MockedRedirect[0]).toHaveAttribute(
    'data-to',
    JSON.stringify({
      pathname: '/',
    }),
  );

  const MockedPollTabs = queryAllByTestId('mocked-poll-tabs');
  expect(MockedPollTabs).toHaveLength(0);

  const MockedLeaderBoard = queryAllByTestId('mocked-leaderboard');
  expect(MockedLeaderBoard).toHaveLength(0);

  const MockedNoMatch = queryAllByTestId('mocked-no-match');
  expect(MockedNoMatch).toHaveLength(0);
});

test("render the PollTabs Component when route is '/'", () => {
  const { queryAllByTestId } = renderAuthenticatedApp('/');

  const MockedPollTabs = queryAllByTestId('mocked-poll-tabs');
  expect(MockedPollTabs).toHaveLength(1);

  const MockedLeaderBoard = queryAllByTestId('mocked-leaderboard');
  expect(MockedLeaderBoard).toHaveLength(0);

  const MockedNoMatch = queryAllByTestId('mocked-no-match');
  expect(MockedNoMatch).toHaveLength(0);
});

test("render the AddPoll Component when route is '/add'", () => {
  const { queryAllByTestId } = renderAuthenticatedApp('/add');

  const MockedAddPoll = queryAllByTestId('mocked-add-poll');
  expect(MockedAddPoll).toHaveLength(1);

  const MockedLeaderBoard = queryAllByTestId('mocked-leaderboard');
  expect(MockedLeaderBoard).toHaveLength(0);

  const MockedNoMatch = queryAllByTestId('mocked-no-match');
  expect(MockedNoMatch).toHaveLength(0);
});

test("render the LeaderBoard Component when route is '/leaderboard'", () => {
  const { queryAllByTestId } = renderAuthenticatedApp('/leaderboard');

  const MockedAddPoll = queryAllByTestId('mocked-add-poll');
  expect(MockedAddPoll).toHaveLength(0);

  const MockedNoMatch = queryAllByTestId('mocked-no-match');
  expect(MockedNoMatch).toHaveLength(0);

  const MockedLeaderBoard = queryAllByTestId('mocked-leaderboard');
  expect(MockedLeaderBoard).toHaveLength(1);
});

test('render the NoMatch Component when route is anythng does NOT match any routes', () => {
  const { queryAllByTestId } = renderAuthenticatedApp(
    '/anyroute-that-not-match',
  );

  const MockedNoMatch = queryAllByTestId('mocked-no-match');
  expect(MockedNoMatch).toHaveLength(1);

  const MockedAddPoll = queryAllByTestId('mocked-add-poll');
  expect(MockedAddPoll).toHaveLength(0);

  const MockedLeaderBoard = queryAllByTestId('mocked-leaderboard');
  expect(MockedLeaderBoard).toHaveLength(0);
});

test("render the ConnectedPollDetailsContainer Component when route is '/questions/:question_id'", () => {
  const { history, queryAllByTestId } = renderAuthenticatedApp(
    '/questions/anyquestion',
  );

  const MockedPollDetailsContainer = queryAllByTestId(
    'mocked-poll-details-container',
  );
  expect(MockedPollDetailsContainer).toHaveLength(1);
  expect(history.location.pathname).toBe('/questions/anyquestion');
});
