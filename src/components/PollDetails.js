import React from 'react';
import { ConnectedUnansweredPoll } from './UnansweredPoll';
import { ConnectedAnsweredPoll } from './AnsweredPoll';
import { connect } from 'react-redux';

const PollDetails = ({answered, qid}) => {
    return (
        <div>
            {answered ? 
                <ConnectedAnsweredPoll qid={qid} />
                :
                <ConnectedUnansweredPoll qid={qid}/> 
            }
        </div>
        
    )
}

const mapStateToProps = ({ authedUser, questions }, { match }) => {
    const { params } = match
    const question = questions[params.question_id];
    const answered = question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser);

    return {
        qid: question.id,
        answered
    }
}

export const ConnectedPollDetails = connect(mapStateToProps)(PollDetails);