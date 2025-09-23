import React from 'react';
import { render, screen } from '@testing-library/react';
import { AvatarImage } from './AvatarImage';

test('renders AvatarImage with a default user', () => {
  // eslint-disable-next-line no-undef
  const defaultImageSrc = `${process.env.PUBLIC_URL}/images/default_avatar.jpg`;
  render(<AvatarImage />);
  const avatarImage = screen.getByTestId('avatar-img');

  expect(avatarImage).toBeInTheDocument();
  expect(avatarImage).toHaveAttribute('class', 'avatar-img');
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

  render(<AvatarImage user={user} size={size} />);
  const avatarImage = screen.getByTestId('avatar-img');

  expect(avatarImage).toBeInTheDocument();
  expect(avatarImage).toHaveClass(`avatar-img avatar-img--${size}`);
  expect(avatarImage).toHaveAttribute('src', avatarURL);
  expect(avatarImage).toHaveAttribute('alt', name);
});

test('renders AvatarImage without the size prop', () => {
  const avatarURL = '::any avatar url::';
  const name = '::any name::';

  const user = {
    avatarURL,
    name,
  };

  render(<AvatarImage user={user} />);
  const avatarImage = screen.getByTestId('avatar-img');

  expect(avatarImage).toBeInTheDocument();
  expect(avatarImage).toHaveAttribute('class', 'avatar-img');
  expect(avatarImage).toHaveAttribute('src', avatarURL);
  expect(avatarImage).toHaveAttribute('alt', name);
});

test('renders AvatarImage with size and style props', () => {
  const avatarURL = '::any avatar url::';
  const name = '::any name::';
  const size = '::size::';

  const user = {
    avatarURL,
    name,
  };

  render(<AvatarImage user={user} size={size} style={{ borderRadius: 0 }} />);
  const avatarImage = screen.getByTestId('avatar-img');

  expect(avatarImage).toBeInTheDocument();
  expect(avatarImage).toHaveClass('avatar-img');
  expect(avatarImage).toHaveClass(`avatar-img avatar-img--${size}`);
  expect(avatarImage).toHaveStyle('border-radius: 0');
  expect(avatarImage).toHaveAttribute('src', avatarURL);
  expect(avatarImage).toHaveAttribute('alt', name);
});
