export const mapStateToProps = ({ authedUser, questions }, { match }) => {
	const { params } = match;
	const question = questions[params.question_id] || {};
	const answered = question.id && (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser));
	
	return {
		qid: question.id,
		answered
	};
};
