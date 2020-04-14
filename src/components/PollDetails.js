import React from 'react';
import { ConnectedPoll } from './Poll';
import { ConnectedPollResults } from './PollResults';
import { useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PollDetails = ({authedUser}) => {
    let location = useLocation();

    if(authedUser) {
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
    } else {
        return (
            <Redirect to='/' />
        );
    }
}

const mapStateToProps = ({authedUser}) => {

    return {
        authedUser
    }
}

export const ConnectedPollDetails = connect(mapStateToProps)(PollDetails);