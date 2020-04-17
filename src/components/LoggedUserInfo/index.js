import './LoggedUserInfo.scss';
import { LoggedUserInfo } from './LoggedUserInfo';
import { connect } from 'react-redux';


const mapStateToProps = ({users, authedUser}) => {
    return {
        userLogged: users[authedUser]
    }
}

export const ConnectedLoggedUserInfo = connect(mapStateToProps)(LoggedUserInfo);