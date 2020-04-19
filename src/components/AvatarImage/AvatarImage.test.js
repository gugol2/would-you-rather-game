import React from 'react';
import { render } from '@testing-library/react';
import { AvatarImage } from './AvatarImage';

test('renders AvatarImage with a default user', () => {
	// eslint-disable-next-line no-undef
	const defaultImageSrc = `${process.env.PUBLIC_URL}/images/default_avatar.jpg`;
	const {getByTestId} = render(<AvatarImage />);
	const avatarImage = getByTestId('avatar-img');
	expect(avatarImage).toBeInTheDocument();
	expect(avatarImage).toHaveClass('avatar-img');
	// expect(avatarImage).toHaveClass('avatar-img', {exact: true});
	expect(avatarImage).toHaveAttribute('src', defaultImageSrc);
	expect(avatarImage).toHaveAttribute('alt', 'default user');
	
});

test('renders AvatarImage with a real user and modifier', () => {
	const avatarURL = '::any avatar url::';
	const name = '::any name::';
	const modifier = '::any modifier::';
	
	const user = {
		avatarURL,
		name
	};
	
	const {getByTestId} = render(<AvatarImage user={user} modifier={modifier} />);
	const avatarImage = getByTestId('avatar-img');
	expect(avatarImage).toBeInTheDocument();
	expect(avatarImage).toHaveClass('avatar-img');
	expect(avatarImage).toHaveClass(`avatar-img avatar-img--${modifier}`);
	expect(avatarImage).toHaveAttribute('src', avatarURL);
	expect(avatarImage).toHaveAttribute('alt', name);

});
