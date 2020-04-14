import React from 'react';
import { connect } from 'react-redux';
import { ConnectedAddPoll } from './AddPoll';
import { ConnectedLeaderBoard } from './LeaderBoard';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { NavBar } from './NavBar';
import { PollDetails } from './PollDetails';
import { NoMatch } from './NoMatch';
import { ConnectedLoggingInfo } from './LoggedUserInfo';
import { ConnectedPollDashboard } from './PollDashboard';
import { ConnectedSignIn } from './SignIn';

const App = (props) => {
  const { authedUser } = props;

  return (
    <Router>
      <div className='header'>
        <NavBar />
        {authedUser && (<ConnectedLoggingInfo />)}
      </div>

      <div className='container'>
        <Switch>
          <Route exact path='/'>
            {authedUser ? 
              <ConnectedPollDashboard /> 
              : 
              <Redirect to='/login' />
            }
          </Route>

          <Route path='/login'>
            {!authedUser ? 
              <ConnectedSignIn /> 
              : 
              <Redirect to='/' />
            }
          </Route>

          <Route path='/add'>
            {authedUser ? 
              <ConnectedAddPoll />
              : 
              <Redirect to='/login' />
            }
          </Route>

          <Route path='/leaderboard'>
            {authedUser ? 
              <ConnectedLeaderBoard />
              : 
              <Redirect to='/login' />
            }
          </Route>

          <Route path='/questions/:question_id'>
            {authedUser ? 
              <PollDetails />
              : 
              <Redirect to='/login' />
            }
          </Route>

          <Route path="*">
              <NoMatch />
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

const mapStateToProps = ({authedUser}) => {
  return {
    authedUser
  }
};

export const ConnectedApp = connect(mapStateToProps)(App);

