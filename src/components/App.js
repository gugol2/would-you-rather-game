import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleReceiveData } from '../actions/shared';
import { ConnectedPollDashboard } from './PollDashboard';
import { ConnectedPoll } from './Poll';
import { ConnectedPollResults } from './PollResults';
import { ConnectedAddPoll } from './AddPoll';
import { ConnectedLeaderBoard } from './LeaderBoard';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { NavBar } from './NavBar';

const App = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    dispatch(handleReceiveData());
    
  }, [dispatch]);

  return (
    <Router className="App">
      <NavBar />
      <div>
        <Route exact path='/'>
          <ConnectedPollDashboard />
        </Route>

        <Route path='/add'>
          <ConnectedAddPoll />
        </Route>

        <Route path='/leaderboard'>
          <ConnectedLeaderBoard />
        </Route>
      </div>
      {/* <ConnectedPoll />
      <ConnectedPollResults /> */}
    </Router>
  );
}

export const ConnectedApp = connect()(App);

