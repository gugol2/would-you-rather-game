import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleReceiveData } from '../actions/shared';
import { ConnectedPollDashboard } from './PollDashboard';
import { ConnectedPoll } from './Poll';
import { ConnectedPollResults } from './PollResults';
import { ConnectedAddPoll } from './AddPoll';
import { ConnectedLeaderBoard } from './LeaderBoard';

const App = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    dispatch(handleReceiveData());
    
  }, [dispatch]);

  return (
    <div className="App">
      Would you rather...?
      <ConnectedPoll />
      <ConnectedPollResults />
      <ConnectedLeaderBoard />
      <ConnectedAddPoll />
      <ConnectedPollDashboard />
    </div>
  );
}

export const ConnectedApp = connect()(App);

