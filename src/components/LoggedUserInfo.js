import React from 'react';
import { AvatarImage } from './AvatarImage';
import { connect } from 'react-redux';
import { logOutAuthedUser } from '../actions/authedUser';
import { useHistory } from 'react-router-dom';

export const LoggedUserInfo = ({userLogged, dispatch}) => {
    let history = useHistory();

    const logOut = () => {
        dispatch(logOutAuthedUser());
        history.push('/login')
    }

    return (
        <div className='logged-user-info'>
            <div>
                {`Hello, ${userLogged.name}`}
            </div>

            <div className='logged-user-info__image'>
                <AvatarImage user={userLogged}/>
            </div>

            <button
                onClick={logOut}
            >Logout</button>

        </div>
    )
}

const mapStateToProps = ({users, authedUser}) => {
    return {
        userLogged: users[authedUser]
    }
}

export const ConnectedLoggingInfo = connect(mapStateToProps)(LoggedUserInfo);

