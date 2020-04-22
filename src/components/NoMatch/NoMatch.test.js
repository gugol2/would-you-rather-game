import React from 'react';
import { render } from '@testing-library/react';
import { NoMatch } from './NoMatch';

test('renders NoMatch', () => {
  const { getByTestId } = render(<NoMatch />);
  const noMatchRendered = getByTestId('no-match');
  expect(noMatchRendered).toBeInTheDocument();
  expect(noMatchRendered).toHaveClass('no-match');
});

test('renders NoMatch serialized snapshot', () => {
  const { container } = render(<NoMatch />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="no-match"
        data-testid="no-match"
      >
        <img
          alt="Page not found!"
          class="no-match"
          src=" /images/404.jpg"
        />
      </div>
    </div>
  `);
});
