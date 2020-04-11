import React from 'react';
import { connect } from 'react-redux';

const PollList = (props) => {
    const { unAnsweredQuestions, answeredQuestions } = props;

    return (
        <div>
            <div>
                <h3>Unanswered Questions</h3>
                <ul>
                    {unAnsweredQuestions.map(uq => (
                        <li key={uq.id}>
                            {uq.id}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Answered Questions</h3>
                <ul>
                    {answeredQuestions.map(aq => (
                        <li key={aq.id}>
                            {aq.id}
                        </li>
                    ))}
                </ul>
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

export const ConnectedPollList = connect(mapStateToProps)(PollList);