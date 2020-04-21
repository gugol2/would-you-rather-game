import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { ConnectedLoggedUserInfo } from '../LoggedUserInfo';
import LoadingBar from 'react-redux-loading';
import PropTypes from 'prop-types';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';

export const App = ({authedUser}) => {

	return (
		<BrowserRouter>

			<div className='header'>
				<NavBar />
				{authedUser && (<ConnectedLoggedUserInfo />)}
			</div>

			<LoadingBar className='loading-bar' />

			<div className='container'>
				{authedUser ? <AuthenticatedApp /> : <UnauthenticatedApp />}
			</div>

		</BrowserRouter>
	);
};

App.propTypes = {
	authedUser: PropTypes.oneOfType([ 
		PropTypes.string.isRequired, 
		(props, key) => props[key] === null ? null : 'Not null'
	])
};