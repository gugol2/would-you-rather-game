import React from 'react';
import { connect } from 'react-redux';

const PollList = (props) => {
    const { unAnsweredQuestions, answeredQuestions, users } = props;

    return (
        <div>
            <div>
                <h3>Unanswered Questions</h3>
                <ul>
                    {unAnsweredQuestions.map(uq => (
                        <li key={uq.id}>
                            <div className='pool-brief'>
                                <div className='pool-brief__header'>
                                    {`${uq.author} asks:`}
                                </div>
                                
                                <div className='pool-brief__body'>
                                    <img 
                                        src={users[uq.author].avatarURL} 
                                        alt={uq.author}
                                        className='avatar-img'
                                    />

                                    <div className='pool-brief__question'>
                                        <strong>Would your rather</strong>
                                        <div className='pool-brief__question-text'>
                                            {`...${uq.optionOne.text}...`}
                                        </div>
                                        <button 
                                            type="submit"
                                            className='center'    
                                        >View Poll</button>
                                    </div>

                                </div>
                                
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Answered Questions</h3>
                <ul>
                    {answeredQuestions.map(aq => (
                        <li key={aq.id}>
                            <div className='pool-brief'>
                                <div className='pool-brief__header'>
                                    {`${aq.author} asks:`}
                                </div>
                                
                                <div className='pool-brief__body'>
                                    <img 
                                        src={users[aq.author].avatarURL} 
                                        alt={aq.author}
                                        className='avatar-img'
                                    />

                                    <div className='pool-brief__question'>
                                        <strong>Would your rather</strong>
                                        <div className='pool-brief__question-text'>
                                            {`...${aq.optionOne.text}...`}
                                        </div>
                                        <button 
                                            type="submit"
                                            className='center'    
                                        >View Poll</button>
                                    </div>

                                </div>
                                
                            </div>
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