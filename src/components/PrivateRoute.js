import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';

export const PrivateRoute = ({component: Component, authedUser, ...rest}) => {
    debugger;
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            authedUser ?
            <Component {...props} />
            : 
            <Redirect to="/login" />
        )} />
    );
};
