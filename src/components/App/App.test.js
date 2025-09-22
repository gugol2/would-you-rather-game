import { render } from '@testing-library/react';
import React from 'react';
import { App } from './App';

/* eslint-disable react/prop-types */

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => (
    <div data-testid='mocked-browser-router'>{children}</div>
  ),
}));

jest.mock('../NavBar', () => ({
  NavBar: () => <div data-testid='mocked-nav-bar'>Mockded NavBar</div>,
}));

jest.mock('../LoggedUserInfo', () => ({
  ConnectedLoggedUserInfo: () => (
    <div data-testid='mocked-logged-user-info'>
      Mocked ConnectedLoggedUserInfo
    </div>
  ),
}));

jest.mock('react-redux-loading', () => {
  const MockLoadingBar = ({ className }) => (
    <div data-testid='mocked-loading-bar' className={className}>
      Mocked LoadingBar
    </div>
  );
  MockLoadingBar.displayName = 'MockLoadingBar';
  return MockLoadingBar;
});

jest.mock('./UnauthenticatedApp', () => ({
  UnauthenticatedApp: () => (
    <div data-testid='mocked-unauthenticated-app'>
      Mocked UnauthenticatedApp
    </div>
  ),
}));

jest.mock('./AuthenticatedApp', () => ({
  AuthenticatedApp: () => (
    <div data-testid='mocked-authenticated-app'>Mocked AuthenticatedApp</div>
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('should render the common components no matter the authedUser ', () => {
  const { getByTestId, queryAllByTestId } = render(<App />);

  const MockedBrowserRouter = getByTestId('mocked-browser-router');
  expect(MockedBrowserRouter).toBeInTheDocument();

  const MockdedNavBar = queryAllByTestId('mocked-nav-bar');
  expect(MockdedNavBar).toHaveLength(1);
  expect(MockdedNavBar[0]).toHaveTextContent('Mockded NavBar');

  const MockedUnauthenticatedApp = queryAllByTestId(
    'mocked-unauthenticated-app',
  );
  expect(MockedUnauthenticatedApp).toHaveLength(1);

  const MockedLoadingBar = queryAllByTestId('mocked-loading-bar');
  expect(MockedLoadingBar).toHaveLength(1);
  expect(MockedLoadingBar[0]).toHaveTextContent('Mocked LoadingBar');
  expect(MockedLoadingBar[0]).toHaveClass('loading-bar');
});

test('should render the UnauthenticatedApp when authedUser is falsy but not LoggedUserInfo and the AuthenticatedApp', () => {
  const authedUser = null;
  const { queryAllByTestId } = render(<App authedUser={authedUser} />);

  const MockedConnectedLoggedUserInfo = queryAllByTestId(
    'mocked-logged-user-info',
  );
  expect(MockedConnectedLoggedUserInfo).toHaveLength(0);

  const MockedLoadingBar = queryAllByTestId('mocked-loading-bar');
  expect(MockedLoadingBar).toHaveLength(1);
  expect(MockedLoadingBar[0]).toHaveTextContent('Mocked LoadingBar');
  expect(MockedLoadingBar[0]).toHaveClass('loading-bar');

  const MockedUnauthenticatedApp = queryAllByTestId(
    'mocked-unauthenticated-app',
  );
  expect(MockedUnauthenticatedApp).toHaveLength(1);
  expect(MockedUnauthenticatedApp[0]).toHaveTextContent(
    'Mocked UnauthenticatedApp',
  );

  const MockedAuthenticatedApp = queryAllByTestId('mocked-authenticated-app');
  expect(MockedAuthenticatedApp).toHaveLength(0);
});

test('should render the LoggedUserInfo and the AuthenticatedApp when authedUser is truthy but not UnauthenticatedApp', () => {
  const authedUser = '::authedUser::';
  const { queryAllByTestId } = render(<App authedUser={authedUser} />);

  const MockedConnectedLoggedUserInfo = queryAllByTestId(
    'mocked-logged-user-info',
  );
  expect(MockedConnectedLoggedUserInfo).toHaveLength(1);
  expect(MockedConnectedLoggedUserInfo[0]).toHaveTextContent(
    'Mocked ConnectedLoggedUserInfo',
  );

  const MockedLoadingBar = queryAllByTestId('mocked-loading-bar');
  expect(MockedLoadingBar).toHaveLength(1);
  expect(MockedLoadingBar[0]).toHaveTextContent('Mocked LoadingBar');
  expect(MockedLoadingBar[0]).toHaveClass('loading-bar');

  const MockedAuthenticatedApp = queryAllByTestId('mocked-authenticated-app');
  expect(MockedAuthenticatedApp).toHaveLength(1);
  expect(MockedAuthenticatedApp[0]).toHaveTextContent(
    'Mocked AuthenticatedApp',
  );

  const MockedUnauthenticatedApp = queryAllByTestId(
    'mocked-unauthenticated-app',
  );
  expect(MockedUnauthenticatedApp).toHaveLength(0);
});
