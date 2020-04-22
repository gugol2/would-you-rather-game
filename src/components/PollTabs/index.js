import './PollTabs.scss';
import { PollTabs } from './PollTabs';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapStateToProps';

export const ConnectedPollTabs = connect(mapStateToProps)(PollTabs);
