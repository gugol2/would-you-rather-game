import './AddPoll.scss';
import { AddPoll } from './AddPoll';
import { connect } from 'react-redux';

const mapStateToProps = ({authedUser}) => {
    return {
        authedUser
    }
};

export const ConnectedAddPoll = connect(mapStateToProps)(AddPoll);