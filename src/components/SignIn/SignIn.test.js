import { render, screen, fireEvent } from '@testing-library/react';
import { SignIn } from './SignIn';
import React from 'react';
import { AvatarImage as MockedAvatarImage } from '../AvatarImage';

jest.mock('../AvatarImage', () => ({
  AvatarImage: jest.fn(() => <>Mocked AvatarImage</>),
}));

const mockedHandleReceiveDataResponse = {
  ['::handleReceiveDataMockedResponse::']:
    '::handleReceiveDataMockedResponse::',
};

jest.mock('../../actions/shared', () => ({
  handleReceiveData: jest.fn(() => mockedHandleReceiveDataResponse),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('SignIn component', () => {
  const context = {};
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
    expect(MockedAvatarImage).not.toHaveBeenCalled();
  });

  test.skip('should render the SignIn component without errors AND the avatar div', () => {
    finishedLoading = true;
    const props = { users, dispatch, finishedLoading };
    render(<SignIn {...props} />);

    const signInComponent = screen.getByTestId('signIn');
    const signInComponentBody = screen.queryByTestId('signInBody');

    expect(signInComponent).toBeInTheDocument();
    expect(signInComponentBody).toBeInTheDocument();

    expect(MockedAvatarImage).toHaveBeenCalledTimes(1);
    expect(MockedAvatarImage).toHaveBeenCalledWith(
      {
        size: 'large',
        user: undefined,
      },
      context,
    );
  });

  test.skip('should render the button disabled until an user is selected', () => {
    finishedLoading = true;
    const props = { users, dispatch, finishedLoading };
    render(<SignIn {...props} />);

    const signInButton = screen.getByRole('button');

    expect(signInButton).toBeDisabled();
  });

  test.skip('should render the button enabled when an user is selected', () => {
    finishedLoading = true;
    const props = { users, dispatch, finishedLoading };
    render(<SignIn {...props} />);

    const signInButton = screen.getByRole('button');
    const userSelector = screen.getByTestId('userSelector');

    expect(signInButton).toBeDisabled();

    fireEvent.change(userSelector, { target: { value: id } });

    expect(signInButton).not.toBeDisabled();
  });

  test.skip('should call dispath whith the right action object when signing in', () => {
    finishedLoading = true;
    const props = { users, dispatch, finishedLoading };
    render(<SignIn {...props} />);

    const signInButton = screen.getByRole('button');
    const userSelector = screen.getByTestId('userSelector');

    fireEvent.change(userSelector, { target: { value: id } });
    fireEvent.click(signInButton);

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
