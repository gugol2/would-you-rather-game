import React from 'react';
import { ConnectedPoll } from './Poll';
import { ConnectedPollResults } from './PollResults';
import { useLocation } from 'react-router-dom';

export const PollDetails = () => {
    let location = useLocation();
    const { state } = location;
    const { qid, unAnswered, authedUser } = state;

    if(authedUser) {
        return (
            <div>
                {unAnswered ? 
                    <ConnectedPoll qid={qid} /> 
                    : 
                    <ConnectedPollResults qid={qid} />}
            </div>
        )
    } else {
        return null;
    }
}