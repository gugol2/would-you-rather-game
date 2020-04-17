// import '../styles/Poll.scss';
import { AnsweredPoll } from './AnsweredPoll';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapStateToProps';

export const ConnectedAnsweredPoll = connect(mapStateToProps)(AnsweredPoll);