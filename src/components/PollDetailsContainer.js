import React from 'react';
import { ConnectedUnansweredPoll } from './UnansweredPoll';
import { ConnectedAnsweredPoll } from './AnsweredPoll';
import { connect } from 'react-redux';
import { NoMatch } from './NoMatch';

const PollDetailsContainer = ({answered, qid}) => {
    if (qid) {
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

    return (<NoMatch />)
}

const mapStateToProps = ({ authedUser, questions }, { match }) => {
    const { params } = match
    const question = questions[params.question_id] || {};
    const answered = question.id && (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser));

    return {
        qid: question.id,
        answered
    }
}

export const ConnectedPollDetailsContainer = connect(mapStateToProps)(PollDetailsContainer);