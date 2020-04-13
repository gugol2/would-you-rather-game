import React from 'react';
import { AvatarImage } from './AvatarImage';
import { connect } from 'react-redux';
import { logOutAuthedUser } from '../actions/authedUser';

export const LoggingInfo = ({userLogged, dispatch}) => {
    const logOut = () => {
        dispatch(logOutAuthedUser());
    }

    return (
        <div className='login-info'>
            <div>
                {`Hello, ${userLogged.name}`}
            </div>

            <div className='login-info-image'>
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

export const ConnectedLoggingInfo = connect(mapStateToProps)(LoggingInfo);

