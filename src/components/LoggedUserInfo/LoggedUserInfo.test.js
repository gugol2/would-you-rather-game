import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoggedUserInfo } from './LoggedUserInfo';
import { AvatarImage as MockedAvatarImage } from '../AvatarImage';
import userEvent from '@testing-library/user-event';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('../AvatarImage', () => ({
  AvatarImage: jest.fn(() => <>Mocked AvatarImage</>),
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

  const context = {};

  test('should render LoggedUserInfo', () => {
    render(<LoggedUserInfo {...props} />);

    const component = screen.getByTestId('loggedUserInfo');
    const greeting = screen.getByTestId('greeting');
    const logOutButton = screen.getByRole('button');

    expect(component).toBeInTheDocument();
    expect(greeting).toHaveTextContent(`Hello, ${userLogged.name}`);
    expect(MockedAvatarImage).toHaveBeenCalledTimes(1);
    expect(MockedAvatarImage).toHaveBeenCalledWith(
      {
        user: userLogged,
        modifier: 'small',
      },
      context,
    );

    expect(logOutButton).toHaveTextContent(/logout/i);
  });

  test('should call dispatch and return to path / when logging out', async () => {
    render(<LoggedUserInfo {...props} />);

    const logOutButton = screen.getByRole('button');

    await userEvent.click(logOutButton);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'LOGOUT_AUTHED_USER' });

    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
