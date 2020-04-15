import React from 'react';
import { connect } from 'react-redux';
import { ConnectedAddPoll } from './AddPoll';
import { ConnectedLeaderBoard } from './LeaderBoard';
import { BrowserRouter as Router, Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import { NavBar } from './NavBar';
import { ConnectedPollDetails } from './PollDetails';
import { NoMatch } from './NoMatch';
import { ConnectedLoggingInfo } from './LoggedUserInfo';
import { ConnectedPollDashboard } from './PollDashboard';
import { ConnectedSignIn } from './SignIn';
import LoadingBar from 'react-redux-loading';

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
          <Route exact path='/'>
            {/* <ConnectedPollDashboard />  */}

            {authedUser ? 
              <ConnectedPollDashboard /> 
              : 
              <Redirect to='/login' />
            }
          </Route>

          <Route path='/login'>
            {/* <ConnectedSignIn />  */}

            {!authedUser ? 
              <ConnectedSignIn /> 
              : 
              <Redirect to='/' />
            }
          </Route>

          <Route path='/add'>
            {/* <ConnectedAddPoll /> */}

            {authedUser ? 
              <ConnectedAddPoll />
              : 
              <Redirect to='/login' />
            }
          </Route>

          <Route path='/leaderboard'>
            {/* <ConnectedLeaderBoard /> */}

            {authedUser ? 
              <ConnectedLeaderBoard />
              : 
              <Redirect to='/login' />
            }
          </Route>

          <Route 
            path='/questions/:question_id'
            render={({match}) => 
              authedUser ? 
                <ConnectedPollDetails {...match}/>
                : 
                <Redirect to='/login' />
            }
            // component={ConnectedPollDetails}
          >
          </Route>

          <Route path="*">
              <NoMatch />
          </Route>
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

