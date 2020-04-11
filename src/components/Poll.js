import React, { useState } from 'react';
import { connect } from 'react-redux';

const Poll = (props) => {
    const [selectedOption, setSelectedOption] = useState('optionOne');

    const { question, pollAuthor } = props;
    const { author, optionOne, optionTwo } = question;
    
    const handleChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const saveQuestionAnswer = () => {
        // TODO: save answer 
    }

    return (
        <div className='pool'>
            <div className='pool__header'>
                {author && `${author} asks:`}
            </div>

            <div className='pool__body'>
                <img 
                    src={pollAuthor.avatarURL} 
                    alt={pollAuthor.id}
                    className='avatar-img'
                />

                <form className='pool__question'>
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
                        onSubmit={saveQuestionAnswer}    
                    >Submit</button>
                </form>

            </div>

        </div>
    )
}

const mapStateToProps = ({questions, loggedUser, users}, {qid}) => {
    const question = questions['vthrdm985a262al8qx3do'] || {};
    return {
        question,
        loggedUser,
        pollAuthor: users[question.author] || {}
    }
}

export const ConnectedPoll = connect(mapStateToProps)(Poll);