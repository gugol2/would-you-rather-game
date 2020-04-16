import React, { useState } from 'react';
import '../styles/PollDashboard.scss';
import { connect } from 'react-redux';
import { PollBrief } from './PollBrief';

const PollTabs = (props) => {
    const [ unansweredTab, setunansweredTab ] = useState(true); 
    const { unAnsweredQuestions, answeredQuestions, users } = props;

    const toggleTab = (value) => {
        setunansweredTab(value)
    }

    const questionsFromTab= unansweredTab ? unAnsweredQuestions : answeredQuestions;

    return (
        <div className='poll-dashboard'>
            <div className='poll-dashboard__tabs'>
                <div 
                    onClick={() => toggleTab(true)}
                    className={unansweredTab ? 'poll-dashboard__tab active' : 'poll-dashboard__tab'}
                >Unanswered Questions</div>
                <div 
                    onClick={() => toggleTab(false)}
                    className={unansweredTab ? 'poll-dashboard__tab' : 'poll-dashboard__tab active'}
                >Answered Questions</div>
            </div>

            <ul>
                {questionsFromTab.map(question => (
                    <li key={question.id}>
                        <PollBrief qauthor={users[question.author]} question={question}/>
                    </li>
                ))}
            </ul>
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
    }
}

export const ConnectedPollTabs = connect(mapStateToProps)(PollTabs);