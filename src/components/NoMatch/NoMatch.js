import React from 'react';
import { imagesPath } from '../../utils/constants';

export const NoMatch = () => {
  return (
    <div data-testid='no-match'>
      <img
        src={`${imagesPath}404.jpg`}
        alt='Page not found!'
        className='no-match'
      />
    </div>
  );
};
