import React, { useState, useEffect } from 'react';
import { setAuthedUser } from '../../actions/authedUser';
import { useLocation, Redirect } from 'react-router-dom';
import { AvatarImage } from '../AvatarImage';
import { handleReceiveData } from '../../actions/shared';

export const SignIn = ({users, dispatch, loading}) => {
	const [selectedUser, setSelectedUser] = useState('');
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);

	let location = useLocation();

	useEffect(() => {
		dispatch(handleReceiveData());
	}, [dispatch]);

	const handleSelection = (event) => {
		setSelectedUser(event.target.value);
	};

	const signInUser = async (event) => {
		event.preventDefault();
		await dispatch(setAuthedUser(selectedUser));
		setRedirectToReferrer(true);
	};

	if (redirectToReferrer) {
		const { from } = location.state || { from: { pathname: '/'} };
		return <Redirect to={from} />;
	}

	return (
		<div className='sign-in'>
			<div className="sign-in__header">
				<div className="sign-in__header-title">
					{'Welcome to the \'Would You Rather...?\' App!!'}
				</div>
				<div className="sign-in__header-subtitle">
                    Please sign in to continue
				</div>
			</div>

			{!loading && (<div className="sign-in__body">
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
			</div>)}
		</div>
	);
};
