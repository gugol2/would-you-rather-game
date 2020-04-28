import React from 'react';
import { render } from '@testing-library/react';
import { PollHeader } from './PollHeader';

test('renders the PollHeader component empty if the user does not have a name property', () => {
  const author = {};
  const { getByTestId } = render(<PollHeader author={author} />);
  const pollHeaderRendered = getByTestId('pollheader');

  expect(pollHeaderRendered).toBeInTheDocument();

  expect(pollHeaderRendered).not.toHaveTextContent();
});

test('renders the PollHeader component NOT empty if the user has a name property', () => {
  const name = '::name::';
  const author = { name };
  const { getByTestId } = render(<PollHeader author={author} />);
  const pollHeaderRendered = getByTestId('pollheader');

  expect(pollHeaderRendered).toBeInTheDocument();

  expect(pollHeaderRendered).toHaveTextContent(`${name} asks:`);
});
