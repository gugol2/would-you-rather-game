import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { handleReceiveUsers } from '../actions/users';
import { useHistory } from 'react-router-dom';
const imagesPath = process.env.PUBLIC_URL + '/images/';

const SignIn = ({users, dispatch}) => {
    const [selectedUser, setSelectedUser] = useState('');
    let history = useHistory();
    
    useEffect(() => {
        dispatch(handleReceiveUsers());
    }, [dispatch]);

    const handleSelection = (event) => {
        setSelectedUser(event.target.value)
    }

    const signInUser = async (event) => {
        event.preventDefault();
        await dispatch(setAuthedUser(selectedUser));
        history.push('/');
    }

    return (
        <div className='sign-in'>
            <div className="sign-in__header">
                <div className="sign-in_header-title">
                    Welcome to the 'Would You Rather...' App!!
                </div>
                <div className="sign-in_header-subtitle">
                    Please sign in to continue
                </div>
            </div>

            <div className="sign-in__body">
                <img src={`${imagesPath}default_avatar.png`} alt=""/>

                <form onSubmit={signInUser}>
                    <select onChange={handleSelection} value={selectedUser}>
                        <option value='' key='0'></option>
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