import './AddPoll.scss';
import { AddPoll } from './AddPoll';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './mapToProps';

export const ConnectedAddPoll = connect(mapStateToProps, mapDispatchToProps)(AddPoll);