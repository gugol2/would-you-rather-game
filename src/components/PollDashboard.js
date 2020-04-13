import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PollList } from './PollList';

const PollDasboard = (props) => {
    const [unansweredTab, setunansweredTab] = useState(true);    
    const { unAnsweredQuestions, answeredQuestions, users } = props;

    const toggleTab = (value) => {
        setunansweredTab(value)
    }

    return (
        <div className='poll-dashboard'>
            <div className='poll-dashboard__tabs'>
                <h3 
                    onClick={() => toggleTab(true)}
                    className={unansweredTab ? 'active' : ''}
                >Unanswered Questions</h3>
                <h3 
                    onClick={() => toggleTab(false)}
                    className={unansweredTab ? '' : 'active'}
                >Answered Questions</h3>
            </div>

            <PollList 
                users={users}
                questions={unansweredTab ? unAnsweredQuestions : answeredQuestions}
                unAnswered={unansweredTab ? true : false}
            />
        </div>
    )
}

const mapStateToProps = ({users, questions, authedUser}) => {
    const {answeredQuestions, unAnsweredQuestions} = Object.values(questions).reduce(
        (acc, cur) => {
            if(cur.optionOne.votes.includes(authedUser) || cur.optionTwo.votes.includes(authedUser)){
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
        answeredQuestions: answeredQuestions ? answeredQuestions.sort((a, b) => b.timestamp - a.timestamp) : [],
        unAnsweredQuestions: unAnsweredQuestions ? unAnsweredQuestions.sort((a, b) => b.timestamp - a.timestamp) : [],
        authedUser
    }
}

export const ConnectedPollDashboard = connect(mapStateToProps)(PollDasboard);