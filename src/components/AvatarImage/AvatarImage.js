import React from 'react';
import PropTypes from 'prop-types';

export const AvatarImage = ({user, modifier}) => {
	return(
		<img 
			data-testid="avatar-img"
			// eslint-disable-next-line no-undef
			src={ user ? user.avatarURL : `${process.env.PUBLIC_URL}/images/default_avatar.jpg` } 
			alt={ user ? user.name : 'default user' }
			className={ modifier ? `avatar-img avatar-img--${modifier}` : 'avatar-img' }
		/>
	);
};

AvatarImage.propTypes = {
	user: PropTypes.shape({
		avatarURL: PropTypes.string,
		name: PropTypes.string
	}),
	modifier: PropTypes.string
};
