import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PollHeader } from './PollHeader';
import { AvatarImage } from './AvatarImage';
import { handleSaveAnswerToQuestion } from '../actions/questions';

const Poll = (props) => {
    const [selectedOption, setSelectedOption] = useState('optionOne');

    const { question, pollAuthor, dispatch, authedUser } = props;
    const { optionOne, optionTwo } = question;
    
    const handleChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const saveQuestionAnswer = (event) => {
        event.preventDefault();

        dispatch(handleSaveAnswerToQuestion({ authedUser, qid: question.id, answer: selectedOption}));
    }

    return (
        <div className='pool'>
            <PollHeader author={pollAuthor}/>

            <div className='pool__body'>
                <AvatarImage user={pollAuthor}/>

                <form className='pool__question' onSubmit={saveQuestionAnswer} >
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
    const id = 'vthrdm985a262al8qx3do';
    const question = questions[id] || {};

    return {
        question,
        authedUser,
        pollAuthor: users[question.author] || {}
    }
}

export const ConnectedPoll = connect(mapStateToProps)(Poll);