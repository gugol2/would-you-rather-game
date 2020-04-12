import React from 'react';

export const PollHeader = ({author}) => {
    return (
        <div className='poll__header'>
                {`${author.name} asks:`}
        </div>
    )
}