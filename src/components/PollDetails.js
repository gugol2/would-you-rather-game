import React from 'react';
import { ConnectedPoll } from './Poll';
import { ConnectedPollResults } from './PollResults';

export const PollDetails = ({location}) => {
    const { state } = location;
    const { qid, unAnswered } = state;

    return (
        <div>
            {unAnswered ? 
                <ConnectedPoll qid={qid} /> 
                : 
                <ConnectedPollResults qid={qid} />}
        </div>
    )
}