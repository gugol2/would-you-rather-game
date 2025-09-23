import React from 'react';
import { screen } from '@testing-library/react';
import { NavBar } from './NavBar';
import { renderWithRouter } from '../../testHelpers/renderWithRouter';

test('renders NavBar', () => {
  renderWithRouter(<NavBar />);
  const navBarRendered = screen.getByTestId('nav-bar');
  expect(navBarRendered).toBeInTheDocument();
  expect(navBarRendered).toHaveClass('navbar');
});
