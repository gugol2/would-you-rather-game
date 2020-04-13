import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PollHeader } from './PollHeader';
import { AvatarImage } from './AvatarImage';
import { handleSaveAnswerToQuestion } from '../actions/questions';
import { useHistory } from 'react-router-dom';

const Poll = (props) => {
    const [selectedOption, setSelectedOption] = useState('optionOne');

    const { question, pollAuthor, dispatch, authedUser } = props;
    const { optionOne, optionTwo } = question;
    let history = useHistory();
    
    const handleChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const saveQuestionAnswer = (event) => {
        event.preventDefault();

        dispatch(handleSaveAnswerToQuestion({ authedUser, qid: question.id, answer: selectedOption}))
            .then(() => {
                history.push(
                    `/questions/${question.id}`, 
                    { 
                        qid: question.id,
                        unAnswered: false,
                        authedUser
                    }
                );
            })
    }

    return (
        <div className='poll'>
            <PollHeader author={pollAuthor}/>

            <div className='poll__body'>
                <div className="poll__left">
                    <AvatarImage user={pollAuthor}/>
                </div>

                <form className='poll__question' onSubmit={saveQuestionAnswer} >
                    <strong>Would your rather</strong>
                    <label>
                        <input 
                            type="radio" 
                            value='optionOne' 
                            checked={selectedOption === 'optionOne'}
                            onChange={handleChange}
                            />
                        {optionOne && optionOne.text}
                    </label>

                    <label>
                        <input
                            type="radio"
                            value='optionTwo'
                            checked={selectedOption === 'optionTwo'}
                            onChange={handleChange}
                            />
                        {optionTwo && optionTwo.text}
                    </label>

                    <button 
                        type="submit"
                        className='center'
                    >Submit</button>
                </form>

            </div>

        </div>
    )
}

const mapStateToProps = ({questions, authedUser, users}, {qid}) => {
    const id = qid || 'loxhs1bqm25b708cmbf3g';
    const question = questions[id] || {};

    return {
        question,
        authedUser,
        pollAuthor: users[question.author] || {}
    }
}

export const ConnectedPoll = connect(mapStateToProps)(Poll);