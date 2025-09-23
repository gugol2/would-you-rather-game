import React from 'react';
import { screen } from '@testing-library/react';
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

  renderAuthenticatedApp(entry);

  const MockedRedirect = screen.queryAllByTestId('mocked-redirect');
  expect(MockedRedirect).toHaveLength(1);
  expect(MockedRedirect[0]).toHaveAttribute(
    'data-to',
    JSON.stringify({
      pathname: previousPathname,
    }),
  );
});

test("render the Redirect Component when route is '/login' with '/' as pathname", () => {
  renderAuthenticatedApp('/login');

  const MockedRedirect = screen.queryAllByTestId('mocked-redirect');
  expect(MockedRedirect).toHaveLength(1);
  expect(MockedRedirect[0]).toHaveAttribute(
    'data-to',
    JSON.stringify({
      pathname: '/',
    }),
  );

  const MockedPollTabs = screen.queryAllByTestId('mocked-poll-tabs');
  expect(MockedPollTabs).toHaveLength(0);

  const MockedLeaderBoard = screen.queryAllByTestId('mocked-leaderboard');
  expect(MockedLeaderBoard).toHaveLength(0);

  const MockedNoMatch = screen.queryAllByTestId('mocked-no-match');
  expect(MockedNoMatch).toHaveLength(0);
});

test("render the PollTabs Component when route is '/'", () => {
  renderAuthenticatedApp('/');

  const MockedPollTabs = screen.queryAllByTestId('mocked-poll-tabs');
  expect(MockedPollTabs).toHaveLength(1);

  const MockedLeaderBoard = screen.queryAllByTestId('mocked-leaderboard');
  expect(MockedLeaderBoard).toHaveLength(0);

  const MockedNoMatch = screen.queryAllByTestId('mocked-no-match');
  expect(MockedNoMatch).toHaveLength(0);
});

test("render the AddPoll Component when route is '/add'", () => {
  renderAuthenticatedApp('/add');

  const MockedAddPoll = screen.queryAllByTestId('mocked-add-poll');
  expect(MockedAddPoll).toHaveLength(1);

  const MockedLeaderBoard = screen.queryAllByTestId('mocked-leaderboard');
  expect(MockedLeaderBoard).toHaveLength(0);

  const MockedNoMatch = screen.queryAllByTestId('mocked-no-match');
  expect(MockedNoMatch).toHaveLength(0);
});

test("render the LeaderBoard Component when route is '/leaderboard'", () => {
  renderAuthenticatedApp('/leaderboard');

  const MockedAddPoll = screen.queryAllByTestId('mocked-add-poll');
  expect(MockedAddPoll).toHaveLength(0);

  const MockedNoMatch = screen.queryAllByTestId('mocked-no-match');
  expect(MockedNoMatch).toHaveLength(0);

  const MockedLeaderBoard = screen.queryAllByTestId('mocked-leaderboard');
  expect(MockedLeaderBoard).toHaveLength(1);
});

test('render the NoMatch Component when route is anythng does NOT match any routes', () => {
  renderAuthenticatedApp('/anyroute-that-not-match');

  const MockedNoMatch = screen.queryAllByTestId('mocked-no-match');
  expect(MockedNoMatch).toHaveLength(1);

  const MockedAddPoll = screen.queryAllByTestId('mocked-add-poll');
  expect(MockedAddPoll).toHaveLength(0);

  const MockedLeaderBoard = screen.queryAllByTestId('mocked-leaderboard');
  expect(MockedLeaderBoard).toHaveLength(0);
});

test("render the ConnectedPollDetailsContainer Component when route is '/questions/:question_id'", () => {
  const { history } = renderAuthenticatedApp('/questions/anyquestion');

  const MockedPollDetailsContainer = screen.queryAllByTestId(
    'mocked-poll-details-container',
  );
  expect(MockedPollDetailsContainer).toHaveLength(1);
  expect(history.location.pathname).toBe('/questions/anyquestion');
});
