import React from 'react';
import { ConnectedAddPoll } from '../AddPoll';
import { ConnectedLeaderBoard } from '../LeaderBoard';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { ConnectedPollDetailsContainer } from '../PollDetailsContainer';
import { NoMatch } from '../NoMatch';
import { ConnectedLoggedUserInfo } from '../LoggedUserInfo';
import { ConnectedPollTabs } from '../PollTabs';
import { ConnectedSignIn } from '../SignIn';
import LoadingBar from 'react-redux-loading';
import { PrivateRoute } from '../PrivateRoute';

export const App = (props) => {
	const { authedUser } = props;

	return (
		<HashRouter>

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

		</HashRouter>
	);
};

