import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoggedUserInfo } from './LoggedUserInfo';
import userEvent from '@testing-library/user-event';

/* eslint-disable react/prop-types */

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('../AvatarImage', () => ({
  AvatarImage: ({ user, size }) => {
    return (
      <div
        data-testid='mocked-avatar-image'
        data-user-name={user?.name}
        data-size={size}
      />
    );
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('LoggedUserInfo', () => {
  const name = '::name::';
  const userLogged = { name };
  const dispatch = jest.fn();
  const props = {
    userLogged,
    dispatch,
  };

  test('should render LoggedUserInfo', () => {
    const { getByTestId, getByRole } = render(<LoggedUserInfo {...props} />);

    const component = getByTestId('loggedUserInfo');
    const greeting = getByTestId('greeting');
    const logOutButton = getByRole('button');

    expect(component).toBeInTheDocument();
    expect(greeting).toHaveTextContent(`Hello, ${userLogged.name}`);

    const MockedAvatarImage = screen.getByTestId('mocked-avatar-image');
    expect(MockedAvatarImage).toBeInTheDocument();
    expect(MockedAvatarImage).toHaveAttribute('data-user-name', name);
    expect(MockedAvatarImage).toHaveAttribute('data-size', 'small');

    expect(logOutButton).toHaveTextContent(/logout/i);
  });

  test('should call dispatch and return to path / when logging out', async () => {
    const { getByRole } = render(<LoggedUserInfo {...props} />);

    const logOutButton = getByRole('button');

    userEvent.click(logOutButton);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'LOGOUT_AUTHED_USER' });

    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
