import React from 'react';
import { render } from '@testing-library/react';
import { NoMatch } from './NoMatch';

test('renders NoMatch', () => {
  const { getByTestId, getByAltText } = render(<NoMatch />);
  const noMatchRendered = getByTestId('no-match');
  const noMatchImage = getByAltText('Page not found!');
  expect(noMatchRendered).toBeInTheDocument();
  expect(noMatchRendered).not.toHaveClass('no-match');
  expect(noMatchImage).toHaveClass('no-match');
  expect(noMatchImage).toHaveAttribute('src', '/images/404.jpg');
});

test('renders NoMatch serialized snapshot', () => {
  const { container } = render(<NoMatch />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        data-testid="no-match"
      >
        <img
          alt="Page not found!"
          class="no-match"
          src="/images/404.jpg"
        />
      </div>
    </div>
  `);
});
