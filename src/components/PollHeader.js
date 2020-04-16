import React from 'react';
import '../styles/PollHeader.scss';

export const PollHeader = ({author}) => {
    return (
        <div className='poll-header'>
                {`${author.name} asks:`}
        </div>
    )
}