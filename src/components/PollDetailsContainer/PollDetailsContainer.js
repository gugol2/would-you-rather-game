import React from 'react';
import { ConnectedUnansweredPoll } from '../UnansweredPoll';
import { ConnectedAnsweredPoll } from '../AnsweredPoll';
import { NoMatch } from '../NoMatch';
import PropTypes from 'prop-types';

export const PollDetailsContainer = ({answered, qid}) => {
	if (qid) {
		return (
			<div>
				{answered ? 
					<ConnectedAnsweredPoll qid={qid} />
					:
					<ConnectedUnansweredPoll qid={qid}/> 
				}
			</div>
            
		);
	}

	return (<NoMatch />);
};

PollDetailsContainer.propTypes = {
	answered: PropTypes.bool.isRequired,
	qid: PropTypes.string.isRequired
};