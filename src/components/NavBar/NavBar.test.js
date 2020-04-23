import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

test('renders NavBar', () => {
  const { getByTestId } = render(<NavBar />, { wrapper: BrowserRouter });
  const navBarRendered = getByTestId('nav-bar');
  expect(navBarRendered).toBeInTheDocument();
  expect(navBarRendered).toHaveClass('navbar');
});
