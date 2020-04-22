import React from 'react';

// eslint-disable-next-line no-undef
const imagesPath = `${process.env.PUBLIC_URL} /images/`;

export const NoMatch = () => {
  return (
    <div className="no-match" data-testid="no-match">
      <img
        src={`${imagesPath}404.jpg`}
        alt="Page not found!"
        className="no-match"
      />
    </div>
  );
};
