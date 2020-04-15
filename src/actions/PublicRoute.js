import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({component: Component, authedUser, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            authedUser ?
            <Redirect to='/' />
            : 
            <Component {...props} />
        )} />
    );
};
