import React from 'react';
import { ConnectedPoll } from './Poll';
import { ConnectedPollResults } from './PollResults';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const PollDetails = ({authedUser}) => {
    let location = useLocation();

    const { state } = location;
    const { qid, unAnswered } = state;

    return (
        <div>
            {unAnswered ? 
                <ConnectedPoll qid={qid}/> 
                :
                <ConnectedPollResults qid={qid} />
            }
        </div>
    )
}

const mapStateToProps = ({authedUser}) => {

    return {
        authedUser
    }
}

export const ConnectedPollDetails = connect(mapStateToProps)(PollDetails);