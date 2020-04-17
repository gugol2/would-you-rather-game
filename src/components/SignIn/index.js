import './SignIn.scss';
import { SignIn } from './SignIn';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapStateToProps';

export const ConnectedSignIn = connect(mapStateToProps)(SignIn);
