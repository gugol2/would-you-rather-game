import React from 'react';
import { render } from '@testing-library/react';
import { NoMatch } from './NoMatch';

test('renders NoMatch', () => {
	const {getByTestId} = render(<NoMatch/>);
	const noMatchRendered = getByTestId('no-match');
	expect(noMatchRendered).toBeInTheDocument();
	expect(noMatchRendered).toHaveClass('no-match');
});

