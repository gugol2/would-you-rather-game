import React from 'react';
import { NavBar } from './NavBar';
import { renderWithRouter } from '../../testHelpers/renderWithRouter';

test('renders NavBar', () => {
  const { getByTestId } = renderWithRouter(<NavBar />);
  const navBarRendered = getByTestId('nav-bar');
  expect(navBarRendered).toBeInTheDocument();
  expect(navBarRendered).toHaveClass('navbar');
});
