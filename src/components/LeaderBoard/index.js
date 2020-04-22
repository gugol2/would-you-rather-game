import './LeaderBoard.scss';
import { LeaderBoard } from './LeaderBoard';
import { connect } from 'react-redux';
import { mapStateToProps } from './mapStateToProps';

export const ConnectedLeaderBoard = connect(mapStateToProps)(LeaderBoard);
