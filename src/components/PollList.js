import React from 'react';
import { PollHeader } from './PollHeader';
import { AvatarImage } from './AvatarImage';

export const PollList = (props) => {
    const { questions, users } = props;

    return (
        <ul>
            {questions.map(uq => (
                <li key={uq.id}>
                    <div className='pool'>
                        <PollHeader author={users[uq.author]}/>
                        
                        <div className='pool__body'>
                            <AvatarImage user={users[uq.author]}/>

                            <div className='pool__question'>
                                <strong>Would your rather</strong>
                                <div className='pool__question-text'>
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
