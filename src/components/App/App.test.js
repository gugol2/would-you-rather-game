import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';
import * as MockedLoadingBar from 'react-redux-loading';
import { BrowserRouter as MockedBrowserRouter } from 'react-router-dom';
import { ConnectedLoggedUserInfo as MockedConnectedLoggedUserInfo } from '../LoggedUserInfo';
import { NavBar as MockdedNavBar } from '../NavBar';
import { UnauthenticatedApp as MockedUnauthenticatedApp } from './UnauthenticatedApp';
import { AuthenticatedApp as MockedAuthenticatedApp } from './AuthenticatedApp';

jest.mock('react-router-dom', () => ({
  BrowserRouter: jest.fn(({ children }) => <>{children}</>),
}));

jest.mock('../NavBar', () => ({
  NavBar: jest.fn(() => <>Mockded NavBar</>),
}));

jest.mock('../LoggedUserInfo', () => ({
  ConnectedLoggedUserInfo: jest.fn(() => <>Mocked LoggedUserInfo</>),
}));

jest.mock('react-redux-loading', () => jest.fn(() => <>Mocked LoadingBar</>));

jest.mock('./UnauthenticatedApp', () => ({
  UnauthenticatedApp: jest.fn(() => <>Mocked UnauthenticatedApp</>),
}));

jest.mock('./AuthenticatedApp', () => ({
  AuthenticatedApp: jest.fn(() => <>Mocked AuthenticatedApp</>),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const context = {};

test('should render the common components no matter the authedUser ', () => {
  render(<App />);

  expect(MockedBrowserRouter).toHaveBeenCalledTimes(1);

  expect(MockdedNavBar).toHaveBeenCalledTimes(1);
  expect(MockdedNavBar).toHaveBeenCalledWith({}, context);

  expect(MockedLoadingBar).toHaveBeenCalledTimes(1);
  expect(MockedLoadingBar).toHaveBeenCalledWith(
    { className: 'loading-bar' },
    context,
  );
});

test('should render the UnauthenticatedApp when authedUser is falsy', () => {
  const authedUser = null;
  render(<App authedUser={authedUser} />);

  expect(MockedConnectedLoggedUserInfo).not.toHaveBeenCalled();

  expect(MockedUnauthenticatedApp).toHaveBeenCalledTimes(1);
  expect(MockedUnauthenticatedApp).toHaveBeenCalledWith({}, context);

  expect(MockedAuthenticatedApp).not.toHaveBeenCalled();
});

test('should render the LoggedUserInfo and the AuthenticatedApp when authedUser is truthy', () => {
  const authedUser = '::authedUser::';
  render(<App authedUser={authedUser} />);

  expect(MockedConnectedLoggedUserInfo).toHaveBeenCalledTimes(1);
  expect(MockedConnectedLoggedUserInfo).toHaveBeenCalledWith({}, context);

  expect(MockedAuthenticatedApp).toHaveBeenCalledTimes(1);
  expect(MockedAuthenticatedApp).toHaveBeenCalledWith({}, context);

  expect(MockedUnauthenticatedApp).not.toHaveBeenCalled();
});
