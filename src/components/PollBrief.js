import React from 'react';
import { PollHeader } from './PollHeader';
import { AvatarImage } from './AvatarImage';
import { Link } from 'react-router-dom';

export const PollBrief = ({qauthor, question}) => {
    return (
        <div className='poll'>
            <PollHeader author={qauthor}/>
            
            <div className='poll__body'>
                <div className="poll__left">
                    <AvatarImage user={qauthor}/>
                </div>

                <div className='poll__question'>
                    <strong>Would your rather</strong>
                    <div className='poll__question-text'>
                        {`...${question.optionOne.text}...`}
                    </div>
                    <Link to={`/questions/${question.id}`}>
                        <button
                            type='button'
                            className='poll__question-button'
                        >View Poll</button>
                    </Link>
                </div>

            </div>
            
        </div>
    )
}