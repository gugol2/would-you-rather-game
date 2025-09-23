import React from 'react';
import { render, screen } from '@testing-library/react';
import { PollHeader } from './PollHeader';

test('renders the PollHeader component empty if the user does not have a name property', () => {
  const author = {};
  render(<PollHeader author={author} />);
  const pollHeaderRendered = screen.getByTestId('pollheader');

  expect(pollHeaderRendered).toBeInTheDocument();

  expect(pollHeaderRendered).not.toHaveTextContent();
});

test('renders the PollHeader component NOT empty if the user has a name property', () => {
  const name = '::name::';
  const author = { name };
  render(<PollHeader author={author} />);
  const pollHeaderRendered = screen.getByTestId('pollheader');

  expect(pollHeaderRendered).toBeInTheDocument();

  expect(pollHeaderRendered).toHaveTextContent(`${name} asks:`);
});
