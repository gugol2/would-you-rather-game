import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { handleReceiveUsers } from '../actions/users';
import { useLocation, Redirect } from 'react-router-dom';
import { AvatarImage } from './AvatarImage';

const SignIn = ({users, dispatch}) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    let location = useLocation();

    useEffect(() => {
        dispatch(handleReceiveUsers());
    }, [dispatch]);

    const handleSelection = (event) => {
        setSelectedUser(event.target.value);
    }

    const signInUser = async (event) => {
        event.preventDefault();
        await dispatch(setAuthedUser(selectedUser));
        setRedirectToReferrer(true);
    }

    if (redirectToReferrer) {
        const { from } = location.state || { from: { pathname: '/'} };
        return <Redirect to={from} />
    }

    return (
        <div className='sign-in'>
            <div className="sign-in__header">
                <div className="sign-in__header-title">
                    Welcome to the 'Would You Rather...' App!!
                </div>
                <div className="sign-in__header-subtitle">
                    Please sign in to continue
                </div>
            </div>

            <div className="sign-in__body">
                <AvatarImage user={users[selectedUser]} modifier='large'/> 

                <form onSubmit={signInUser} className="sign-in__body-form">

                    <div className="sign-in__body-form-title">Sign In</div>
                    
                    <select onChange={handleSelection} value={selectedUser}>
                        <option value='' key='0' disabled>Choose an user!</option>
                        {Object.values(users).map(user => (
                            <option value={user.id} key={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <input 
                        type="submit" 
                        value="Sign In"
                        disabled={selectedUser === ''}
                    />
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = ({users}) => {
    return {
        users
    }
}

export const ConnectedSignIn = connect(mapStateToProps)(SignIn);