import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PollHeader } from './PollHeader';
import { AvatarImage } from './AvatarImage';
import { handleSaveAnswerToQuestion } from '../actions/questions';

const UnansweredPoll = (props) => {
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
        <div className='poll'>
            <PollHeader author={pollAuthor}/>

            <div className='poll__body'>
                <div className="poll__left">
                    <AvatarImage user={pollAuthor} modifier='medium' />
                </div>

                <form className='poll__question' onSubmit={saveQuestionAnswer} >
                    <strong>Would your rather</strong>
                    <label className='poll__question-text'>
                        <input 
                            type="radio" 
                            value='optionOne' 
                            checked={selectedOption === 'optionOne'}
                            onChange={handleChange}
                            />
                        {optionOne && optionOne.text}
                    </label>

                    <label className='poll__question-text'>
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
                        className='btn poll__button'
                    >Submit</button>
                </form>

            </div>

        </div>
    )

}

const mapStateToProps = ({questions, authedUser, users}, {qid}) => {
    const question = questions[qid] || {};

    return {
        question,
        authedUser,
        pollAuthor: users[question.author] || {}
    }
}

export const ConnectedUnansweredPoll = connect(mapStateToProps)(UnansweredPoll);