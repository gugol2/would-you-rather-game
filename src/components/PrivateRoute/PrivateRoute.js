import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({component: Component, authedUser, ...rest}) => {
	return (

	// Show the component only when the user is logged in
	// Otherwise, redirect the user to /login page
		<Route {...rest} render={props => (
			authedUser ?
				<Component {...props} />
				: 
				<Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				}} />
		)} />
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.object,
	]),
	
	location: PropTypes.object,

	authedUser: PropTypes.oneOfType([ 
		PropTypes.string.isRequired, 
		(props, key) => props[key] === null ? null : 'Not null'
	])
};
