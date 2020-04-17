import './LoggedUserInfo.scss';
import { LoggedUserInfo } from './LoggedUserInfo';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapStateToProps';

export const ConnectedLoggedUserInfo = connect(mapStateToProps)(LoggedUserInfo);