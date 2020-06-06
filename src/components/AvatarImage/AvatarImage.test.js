import React from 'react';
import { render } from '@testing-library/react';
import { AvatarImage } from './AvatarImage';

test('renders AvatarImage with a default user', () => {
  // eslint-disable-next-line no-undef
  const defaultImageSrc = `${process.env.PUBLIC_URL}/images/default_avatar.jpg`;
  const { getByTestId } = render(<AvatarImage />);
  const avatarImage = getByTestId('avatar-img');
  expect(avatarImage).toBeInTheDocument();
  expect(avatarImage).toHaveClass('avatar-img');
  // expect(avatarImage).toHaveClass('avatar-img', {exact: true});
  expect(avatarImage).toHaveAttribute('src', defaultImageSrc);
  expect(avatarImage).toHaveAttribute('alt', 'default user');
});

test('renders AvatarImage with a real user and size', () => {
  const avatarURL = '::any avatar url::';
  const name = '::any name::';
  const size = '::any size::';

  const user = {
    avatarURL,
    name,
  };

  const { getByTestId } = render(<AvatarImage user={user} size={size} />);
  const avatarImage = getByTestId('avatar-img');
  expect(avatarImage).toBeInTheDocument();
  expect(avatarImage).toHaveClass('avatar-img');
  expect(avatarImage).toHaveClass(`avatar-img avatar-img--${size}`);
  expect(avatarImage).toHaveAttribute('src', avatarURL);
  expect(avatarImage).toHaveAttribute('alt', name);
});
