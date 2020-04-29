import './UnansweredPoll.scss';
import { UnansweredPoll } from './UnansweredPoll';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapToProps';

export const ConnectedUnansweredPoll = connect(mapStateToProps)(UnansweredPoll);
