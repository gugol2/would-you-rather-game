import React from 'react';
import { AvatarImage } from '../AvatarImage';
import { logOutAuthedUser } from '../../actions/authedUser';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export const LoggedUserInfo = ({ userLogged, dispatch }) => {
  const history = useHistory();

  const logOut = () => {
    dispatch(logOutAuthedUser());
    history.push('/');
  };

  return (
    <div className='logged-user-info' data-testid='loggedUserInfo'>
      <div data-testid='greeting'>{`Hello, ${userLogged.name}`}</div>

      <AvatarImage user={userLogged} size='small' />

      <button onClick={logOut} className='logged-user-info__button'>
        Logout
      </button>
    </div>
  );
};

LoggedUserInfo.propTypes = {
  userLogged: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
