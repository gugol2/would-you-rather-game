import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SignIn } from './SignIn';

/* eslint-disable react/prop-types */

jest.mock('../AvatarImage', () => ({
  AvatarImage: ({ user, size }) => {
    return (
      <div
        data-testid='mocked-avatar-image'
        data-user={user}
        data-size={size}
      />
    );
  },
}));

const mockedHandleReceiveDataResponse = {
  ['::handleReceiveDataMockedResponse::']:
    '::handleReceiveDataMockedResponse::',
};

jest.mock('../../actions/shared', () => ({
  handleReceiveData: () => mockedHandleReceiveDataResponse,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('SignIn component', () => {
  const id = '::id::';
  const name = '::name::';
  const user1 = '::user1::';
  const users = { [user1]: { id, name } };
  const dispatch = jest.fn();
  let finishedLoading;

  test('should render the SignIn component without errors BUT NOT the avatar div', () => {
    finishedLoading = false;
    const props = { users, dispatch, finishedLoading };
    render(<SignIn {...props} />);

    const signInComponent = screen.getByTestId('signIn');
    const signInComponentBody = screen.queryByTestId('signInBody');

    expect(signInComponent).toBeInTheDocument();
    expect(signInComponentBody).not.toBeInTheDocument();

    const mockedAvatarImage = screen.queryByTestId('mocked-avatar-image');
    expect(mockedAvatarImage).not.toBeInTheDocument();
  });

  test('should render the SignIn component without errors AND the avatar div', () => {
    finishedLoading = true;
    const props = { users, dispatch, finishedLoading };
    render(<SignIn {...props} />);

    const signInComponent = screen.getByTestId('signIn');
    const signInComponentBody = screen.getByTestId('signInBody');

    expect(signInComponent).toBeInTheDocument();
    expect(signInComponentBody).toBeInTheDocument();

    const mockedAvatarImage = screen.queryByTestId('mocked-avatar-image');
    expect(mockedAvatarImage).toBeInTheDocument();
    expect(mockedAvatarImage).toHaveAttribute('data-size', 'large');
    expect(mockedAvatarImage).not.toHaveAttribute('data-user');
  });

  test('should render the button disabled until an user is selected', () => {
    finishedLoading = true;
    const props = { users, dispatch, finishedLoading };
    render(<SignIn {...props} />);

    const signInButton = screen.getByTestId('signInButton');

    expect(signInButton).toBeDisabled();
  });

  test('should render the button enabled when an user is selected', async () => {
    finishedLoading = true;
    const props = { users, dispatch, finishedLoading };
    render(<SignIn {...props} />);

    const signInButton = screen.getByTestId('signInButton');
    const userSelector = screen.getByTestId('userSelector');

    expect(signInButton).toBeDisabled();

    await userEvent.selectOptions(userSelector, id);

    expect(signInButton).not.toBeDisabled();
  });

  test('should call dispatch with the right action object when signing in', async () => {
    finishedLoading = true;
    const props = { users, dispatch, finishedLoading };
    render(<SignIn {...props} />);

    const signInButton = screen.getByTestId('signInButton');
    const userSelector = screen.getByTestId('userSelector');

    await userEvent.selectOptions(userSelector, id);
    await userEvent.click(signInButton);

    expect(dispatch).toHaveBeenCalledTimes(2);

    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      mockedHandleReceiveDataResponse,
    );

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      id: '::id::',
      type: 'SET_AUTHED_USER',
    });
  });
});
