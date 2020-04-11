import React from 'react';
import { connect } from 'react-redux';
import { PollList } from './PollList';

const PollDasboard = (props) => {
    const { unAnsweredQuestions, answeredQuestions, users } = props;

    return (
        <div>
            <div>
                <h3>Unanswered Questions</h3>
                <PollList 
                    users={users}
                    questions={unAnsweredQuestions}
                />
            </div>

            <div>
                <h3>Answered Questions</h3>
                <PollList 
                    users={users}
                    questions={answeredQuestions}
                />
            </div>
        </div>
    )
}

const mapStateToProps = ({users, questions, loggedUser}) => {
    const {answeredQuestions, unAnsweredQuestions} = Object.values(questions).reduce(
        (acc, cur) => {
            if(cur.optionOne.votes.includes(loggedUser) || cur.optionTwo.votes.includes(loggedUser)){
                return { 
                    ...acc, 
                    'answeredQuestions': [...acc.answeredQuestions || [], cur]
                }
            }
            else {
                return { 
                    ...acc, 
                    'unAnsweredQuestions': [...acc.unAnsweredQuestions || [], cur]
                }
            }
            
        }, {});

    return {
        users,
        answeredQuestions: answeredQuestions || [],
        unAnsweredQuestions: unAnsweredQuestions || [],
        loggedUser
    }
}

export const ConnectedPollDashboard = connect(mapStateToProps)(PollDasboard);