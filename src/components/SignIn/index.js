import './SignIn.scss';
import { SignIn } from './SignIn';
import { connect } from 'react-redux';

const mapStateToProps = ({users, loadingBar}) => {
    return {
        users,
        loading: loadingBar.default
    }
}

export const ConnectedSignIn = connect(mapStateToProps)(SignIn);
