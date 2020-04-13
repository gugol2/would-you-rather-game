import React from 'react';
import { connect } from 'react-redux';
import { ConnectedAddPoll } from './AddPoll';
import { ConnectedLeaderBoard } from './LeaderBoard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from './NavBar';
import { PollDetails } from './PollDetails';
import { NoMatch } from './NoMatch';
import { ConnectedLoggingInfo } from './LoggedUserInfo';
import { ConnectedHome } from './Home';

const App = (props) => {
  const { authedUser } = props;

  return (
    <Router>
      <div className='container'>
      <NavBar />
      {authedUser && (<ConnectedLoggingInfo />)}
        <Switch>
          <Route exact path='/'>
            <ConnectedHome />
          </Route>

          <Route path='/add'>
            <ConnectedAddPoll />
          </Route>

          <Route path='/leaderboard'>
            <ConnectedLeaderBoard />
          </Route>

          <Route path='/questions/:question_id'>
            <PollDetails />
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

