import React from 'react';
import '../styles/NoMatch.scss';

const imagesPath = process.env.PUBLIC_URL + '/images/';

export const NoMatch = () => {
    return (
        <div className="center">
            <img 
                src={`${imagesPath}404.jpg`} 
                alt="Page not found!"
                className='no-match'
            />
        </div>
    )
}