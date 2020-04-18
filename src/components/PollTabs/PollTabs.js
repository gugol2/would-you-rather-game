import React, { useState } from 'react';
import { PollBrief } from '../PollBrief';

export const PollTabs = (props) => {
	const [ unansweredTab, setunansweredTab ] = useState(true); 
	const { unAnsweredQuestions, answeredQuestions, users } = props;

	const toggleTab = (value) => {
		setunansweredTab(value);
	};

	const questionsFromTab= unansweredTab ? unAnsweredQuestions : answeredQuestions;

	return (
		<div className='poll-dashboard'>
			<div className='poll-dashboard__tabs'>
				<div 
					onClick={() => toggleTab(true)}
					className={unansweredTab ? 'poll-dashboard__tab active' : 'poll-dashboard__tab'}
				>Unanswered Questions</div>
				<div 
					onClick={() => toggleTab(false)}
					className={unansweredTab ? 'poll-dashboard__tab' : 'poll-dashboard__tab active'}
				>Answered Questions</div>
			</div>

			<ul>
				{questionsFromTab.map(question => (
					<li key={question.id}>
						<PollBrief qauthor={users[question.author]} question={question}/>
					</li>
				))}
			</ul>
		</div>
	);
};