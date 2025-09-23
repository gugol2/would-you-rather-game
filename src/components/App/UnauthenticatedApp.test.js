import React from 'react';
import { screen } from '@testing-library/react';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { renderWithRouter } from '../../setupTests';

/* eslint-disable react/prop-types */

jest.mock('../SignIn', () => {
  return {
    ConnectedSignIn: () => (
      <div data-testid='mocked-sign-in'>Mocked SignIn</div>
    ),
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Redirect: ({ to }) => (
    <div data-testid='mocked-redirect' to={JSON.stringify(to)}>
      Mocked Redirect
    </div>
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderUnauthenticatedApp = initialEntry => {
  return renderWithRouter(<UnauthenticatedApp />, {
    route: initialEntry,
  });
};

test('render the SignIn component when the path is /login', () => {
  renderUnauthenticatedApp('/login');

  const MockedSingIn = screen.queryByTestId('mocked-sign-in');
  expect(MockedSingIn).toBeInTheDocument();
  expect(MockedSingIn).not.toHaveAttribute();

  const MockedRedirect = screen.queryByTestId('mocked-redirect');
  expect(MockedRedirect).not.toBeInTheDocument();
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

  const MockedRedirect = screen.queryByTestId('mocked-redirect');
  expect(MockedRedirect).toBeInTheDocument();

  const expectedTo = {
    pathname: '/login',
    state: {
      from: {
        hash: '',
        key: '::key::',
        pathname: '/anything',
        search: '',
        state: { from: { pathname: previousPathname } },
      },
    },
  };

  expect(JSON.parse(MockedRedirect.getAttribute('to'))).toEqual(expectedTo);

  const MockedSingIn = screen.queryByTestId('mocked-sign-in');
  expect(MockedSingIn).not.toBeInTheDocument();
});
