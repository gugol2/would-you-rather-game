import React from 'react';
import { ConnectedUnansweredPoll } from '../UnansweredPoll';
import { ConnectedAnsweredPoll } from '../AnsweredPoll';
import { NoMatch } from '../NoMatch';

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
