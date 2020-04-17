import './App.scss'
import { App } from './App';
import { connect } from 'react-redux';

const mapStateToProps = ({authedUser}) => {
    return {
      authedUser
    }
};
  
export const ConnectedApp = connect(mapStateToProps)(App);