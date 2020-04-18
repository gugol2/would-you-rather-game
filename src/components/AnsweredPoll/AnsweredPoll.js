import React from 'react';
import { PollHeader } from '../PollHeader';
import { AvatarImage } from '../AvatarImage';
import { PollResultOption } from '../PollResultOption';

export const AnsweredPoll = (props) => {
	const { 
		question, 
		pollAuthor, 
		votesOptionOne,
		votesOptionTwo,
		totalVotes,
		percentageOptionOne,
		percentageOptionTwo,
		authedUser
	} = props;

	const { optionOne, optionTwo } = question;

	return (
		<div className='poll'>
			<PollHeader author={pollAuthor}/>

			<div className='poll__body'>
				<div className="poll__left">
					<AvatarImage user={pollAuthor} modifier='medium' />
				</div>

				<div className="poll__question">
					<strong>Results:</strong>

					<PollResultOption 
						option={optionOne}
						percentageOption={percentageOptionOne}
						votesOption={votesOptionOne}
						totalVotes={totalVotes}
						authedUser={authedUser}
					/>

					<PollResultOption 
						option={optionTwo}
						percentageOption={percentageOptionTwo}
						votesOption={votesOptionTwo}
						totalVotes={totalVotes}
						authedUser={authedUser}
					/>
				</div>
			</div>
		</div>
	);
};
