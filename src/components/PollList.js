import React from 'react';

export const PollList = (props) => {
    const { questions, users } = props;

    return (
        <ul>
            {questions.map(uq => (
                    <li key={uq.id}>
                        <div className='pool'>
                            <div className='pool__header'>
                                {`${uq.author} asks:`}
                            </div>
                            
                            <div className='pool__body'>
                                <img 
                                    src={users[uq.author].avatarURL} 
                                    alt={uq.author}
                                    className='avatar-img'
                                />

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
