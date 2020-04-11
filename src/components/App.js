import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleReceiveData } from '../actions/shared';

const App = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    dispatch(handleReceiveData());
    
  }, []);

  return (
    <div className="App">
      Would you rather...?
    </div>
  );
}

export const ConnectedApp = connect()(App);

