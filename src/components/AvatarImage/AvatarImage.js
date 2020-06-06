import React from 'react';
import PropTypes from 'prop-types';

export const AvatarImage = ({ user, size }) => {
  const sizeClassName = size ? `avatar-img--${size}` : '';

  return (
    <img
      data-testid='avatar-img'
      src={
        user
          ? user.avatarURL
          : // eslint-disable-next-line no-undef
            `${process.env.PUBLIC_URL}/images/default_avatar.jpg`
      }
      alt={user ? user.name : 'default user'}
      className={`avatar-img ${sizeClassName}`.trim()}
    />
  );
};

AvatarImage.propTypes = {
  user: PropTypes.shape({
    avatarURL: PropTypes.string,
    name: PropTypes.string,
  }),
  size: PropTypes.string,
};
