import './App.scss';
import { App } from './App';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapStateToProps';
  
export const ConnectedApp = connect(mapStateToProps)(App);