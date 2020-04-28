import './SignIn.scss';
import { SignIn } from './SignIn';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapToProps';

export const ConnectedSignIn = connect(mapStateToProps)(SignIn);
