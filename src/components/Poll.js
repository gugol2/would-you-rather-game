import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PollHeader } from './PollHeader';
import { AvatarImage } from './AvatarImage';


const Poll = (props) => {
    const [selectedOption, setSelectedOption] = useState('optionOne');

    const { question, pollAuthor } = props;
    const { optionOne, optionTwo } = question;
    
    const handleChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const saveQuestionAnswer = () => {
        // TODO: save answer 
    }

    return (
        <div className='pool'>
            <PollHeader author={pollAuthor}/>

            <div className='pool__body'>
                <AvatarImage user={pollAuthor}/>

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

const mapStateToProps = ({questions, setAuthedUser, users}, {qid}) => {
    const question = questions['vthrdm985a262al8qx3do'] || {};
    return {
        question,
        setAuthedUser,
        pollAuthor: users[question.author] || {}
    }
}

export const ConnectedPoll = connect(mapStateToProps)(Poll);