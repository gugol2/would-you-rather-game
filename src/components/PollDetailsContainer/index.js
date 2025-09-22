import { PollDetailsContainer } from './PollDetailsContainer';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapStateToProps';

export const ConnectedPollDetailsContainer =
  connect(mapStateToProps)(PollDetailsContainer);
