import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleReceiveData } from '../actions/shared';
import { ConnectedPollList } from './PollList';

const App = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    dispatch(handleReceiveData());
    
  }, [dispatch]);

  return (
    <div className="App">
      Would you rather...?
      <ConnectedPollList />
    </div>
  );
}

export const ConnectedApp = connect()(App);

