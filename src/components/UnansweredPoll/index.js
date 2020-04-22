import './UnansweredPoll.scss';
import { UnansweredPoll } from './UnansweredPoll';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapStateToProps';

export const ConnectedUnansweredPoll = connect(mapStateToProps)(UnansweredPoll);
