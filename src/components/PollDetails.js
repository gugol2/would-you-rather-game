import React from 'react';
import { ConnectedUnansweredPoll } from './UnansweredPoll';
import { ConnectedAnsweredPoll } from './AnsweredPoll';
import { useLocation } from 'react-router-dom';

export const PollDetails = () => {
    let location = useLocation();

    const { state } = location;
    const { qid, unAnswered } = state;

    return (
        <div>
            {unAnswered ? 
                <ConnectedUnansweredPoll qid={qid}/> 
                :
                <ConnectedAnsweredPoll qid={qid} />
            }
        </div>
    )
}
