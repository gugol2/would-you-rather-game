import React from 'react';
import { AvatarImage } from './AvatarImage';
import { connect } from 'react-redux';

export const LoggingInfo = ({userLogged}) => {
    const logOut = () => {
        console.log('logged out user:', userLogged.name);

        // todo: log out authed user
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

