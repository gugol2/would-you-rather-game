export const mapStateToProps = ({users, questions, authedUser}) => {
	const {answeredQuestions, unAnsweredQuestions} = Object.values(questions).reduce(
		(acc, cur) => {
			if(cur.optionOne.votes.includes(authedUser) || cur.optionTwo.votes.includes(authedUser)){
				return { 
					...acc, 
					'answeredQuestions': [...acc.answeredQuestions || [], cur]
				};
			}
			else {
				return { 
					...acc, 
					'unAnsweredQuestions': [...acc.unAnsweredQuestions || [], cur]
				};
			}
            
		}, {});

	return {
		users,
		answeredQuestions: answeredQuestions ? answeredQuestions.sort((a, b) => b.timestamp - a.timestamp) : [],
		unAnsweredQuestions: unAnsweredQuestions ? unAnsweredQuestions.sort((a, b) => b.timestamp - a.timestamp) : [],
	};
};
