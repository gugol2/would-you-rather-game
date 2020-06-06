import React from 'react';
import PropTypes from 'prop-types';

export const AvatarImage = ({ user, modifier }) => {
  const sizeClassName = modifier ? `avatar-img--${modifier}` : '';

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
  modifier: PropTypes.string,
};
