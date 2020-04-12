import React from 'react';
import { PollHeader } from './PollHeader';
import { AvatarImage } from './AvatarImage';

export const PollList = (props) => {
    const { questions, users } = props;

    return (
        <ul>
            {questions.map(uq => (
                <li key={uq.id}>
                    <div className='poll'>
                        <PollHeader author={users[uq.author]}/>
                        
                        <div className='poll__body'>
                            <div className="poll__left">
                                <AvatarImage user={users[uq.author]}/>
                            </div>

                            <div className='poll__question'>
                                <strong>Would your rather</strong>
                                <div className='poll__question-text'>
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
    )
}
