import React from 'react';
import { render } from '@testing-library/react';
import { AvatarImage } from './AvatarImage';

test('renders learn react link', () => {
	const {getByTestId} = render(<AvatarImage />);
	expect(getByTestId('avatar-img')).toBeInTheDocument();
});
