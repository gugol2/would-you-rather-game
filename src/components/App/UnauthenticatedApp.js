import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedSignIn } from '../SignIn';

export const UnauthenticatedApp = () => {
	return (
		<Switch>
			<Route
				path='/login' 
			><ConnectedSignIn /></Route>
	
			<Route 
				path='*' 
				render = {({location}) => {
					return (<Redirect to={{
						pathname: '/login',
						state: { from: location }
					}} />);
				}}
			>
			</Route>

		</Switch>

	);
};
