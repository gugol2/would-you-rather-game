import React from 'react';

export const AvatarImage = ({user}) => {
    return(
        <img 
            src={user.avatarURL} 
            alt={user.name}
            className='avatar-img'
        />
    )
}