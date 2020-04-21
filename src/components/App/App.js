import React from 'react';
import { ConnectedAddPoll } from '../AddPoll';
import { ConnectedLeaderBoard } from '../LeaderBoard';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { ConnectedPollDetailsContainer } from '../PollDetailsContainer';
import { NoMatch } from '../NoMatch';
import { ConnectedLoggedUserInfo } from '../LoggedUserInfo';
import { ConnectedPollTabs } from '../PollTabs';
import { ConnectedSignIn } from '../SignIn';
import LoadingBar from 'react-redux-loading';
import { PrivateRoute } from '../PrivateRoute';
import PropTypes from 'prop-types';

export const App = ({authedUser}) => {

	return (
		<BrowserRouter>

			<div className='header'>
				<NavBar />
				{authedUser && (<ConnectedLoggedUserInfo />)}
			</div>

			<LoadingBar className='loading-bar' />

			<div className='container'>
				<Switch>
					<Route
						path='/login' 
						component={ConnectedSignIn}
					/>

					<PrivateRoute 
						exact path='/'
						component={ConnectedPollTabs}
						authedUser={authedUser}
					/>

					<PrivateRoute 
						path='/add' 
						component={ConnectedAddPoll}
						authedUser={authedUser}
					/>

					<PrivateRoute 
						path='/questions/:question_id'
						component={ConnectedPollDetailsContainer}
						authedUser={authedUser}
					/>

					<PrivateRoute 
						path='/leaderboard'
						component={ConnectedLeaderBoard}
						authedUser={authedUser}
					/>

					<PrivateRoute 
						path='*'
						component={NoMatch}
						authedUser={authedUser}
					/>
				</Switch>
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