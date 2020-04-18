import React from 'react';

export const PollHeader = ({author}) => {
	return (
		<div className='poll-header'>
			{`${author.name} asks:`}
		</div>
	);
};