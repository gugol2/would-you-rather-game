import React from 'react';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { renderWithRouter } from '../../setupTests';
import { ConnectedSignIn as MockedSingIn } from '../SignIn';
import { Redirect as MockedRedirect } from 'react-router-dom';

jest.mock('../SignIn', () => {
  return {
    ConnectedSignIn: jest.fn(() => 'MockedSingIn'),
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Redirect: jest.fn(() => 'MockedRedirect'),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderUnauthenticatedApp = initialEntry => {
  return renderWithRouter(<UnauthenticatedApp />, {
    route: initialEntry,
  });
};

const context = {};

test('render the SignIn component when the path is /login', () => {
  renderUnauthenticatedApp('/login');

  expect(MockedSingIn).toHaveBeenCalledTimes(1);
  expect(MockedSingIn).toHaveBeenCalledWith({}, context);
});

test('render the Redirect component when the path is ANYTHING than /login', () => {
  const previousPathname = '::previousPathname::';

  const entry = {
    pathname: '/anything',
    search: '',
    hash: '',
    state: { from: { pathname: previousPathname } },
    key: '::key::',
  };

  renderUnauthenticatedApp(entry);
  expect(MockedRedirect).toHaveBeenCalledTimes(1);
  expect(MockedRedirect).toHaveBeenCalledWith(
    {
      to: {
        pathname: '/login',
        state: {
          from: {
            hash: '',
            key: '::key::',
            pathname: '/anything',
            search: '',
            state: { from: { pathname: '::previousPathname::' } },
          },
        },
      },
    },
    context,
  );
});
