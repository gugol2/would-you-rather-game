import React from 'react';
import PropTypes from 'prop-types';

export const PollHeader = ({author}) => {
	return (
		<div className='poll-header'>
			{`${author.name} asks:`}
		</div>
	);
};

PollHeader.propTypes = {
	author: PropTypes.object.isRequired
};