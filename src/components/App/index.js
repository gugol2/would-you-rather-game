import './App.scss';
import { App } from './App';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapToProps';
  
export const ConnectedApp = connect(mapStateToProps)(App);