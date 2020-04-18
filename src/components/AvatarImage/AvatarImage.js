import React from 'react';

export const AvatarImage = ({user, modifier}) => {
	return(
		<img 
			src={ user ? user.avatarURL : `${process.env.PUBLIC_URL}/images/default_avatar.jpg` } 
			alt={ user ? user.name : 'default user' }
			className={ modifier ? `avatar-img avatar-img--${modifier}` : 'avatar-img' }
		/>
	);
};