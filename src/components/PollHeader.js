import React from 'react';

export const PollHeader = ({author}) => {
    return (
        <div className='pool__header'>
                {`${author.name} asks:`}
        </div>
    )
}