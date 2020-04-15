import React from 'react';
import { connect } from 'react-redux';
import { ConnectedAddPoll } from './AddPoll';
import { ConnectedLeaderBoard } from './LeaderBoard';
import { Switch, HashRouter, Route } from 'react-router-dom'
import { NavBar } from './NavBar';
import { ConnectedPollDetails } from './PollDetails';
import { NoMatch } from './NoMatch';
import { ConnectedLoggingInfo } from './LoggedUserInfo';
import { ConnectedPollDashboard } from './PollDashboard';
import { ConnectedSignIn } from './SignIn';
import LoadingBar from 'react-redux-loading';
import { PrivateRoute } from './PrivateRoute';

const App = (props) => {
  const { authedUser } = props;

  return (
    <HashRouter>
      <div className='header'>
        <NavBar />
        {authedUser && (<ConnectedLoggingInfo />)}
      </div>
      <LoadingBar />
      <div className='container'>
        <Switch>
          <PrivateRoute 
            exact path='/'
            component={ConnectedPollDashboard}
            authedUser={authedUser}
          />

          <PrivateRoute 
            path='/add' 
            component={ConnectedAddPoll}
            authedUser={authedUser}
          />

          <Route
            path='/login' 
            component={ConnectedSignIn}
          />

          <PrivateRoute 
            path='/questions/:question_id'
            component={ConnectedPollDetails}
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
}

const mapStateToProps = ({authedUser}) => {
  return {
    authedUser
  }
};

export const ConnectedApp = connect(mapStateToProps)(App);

