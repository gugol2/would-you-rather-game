import './AddPoll.scss';
import { AddPoll } from './AddPoll';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapStateToProps';

export const ConnectedAddPoll = connect(mapStateToProps)(AddPoll);