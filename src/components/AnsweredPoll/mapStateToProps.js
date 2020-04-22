export const mapStateToProps = ({ questions, authedUser, users }, { qid }) => {
  const id = qid || 'loxhs1bqm25b708cmbf3g';
  const question = questions[id] || {};

  let votesOptionOne = 0;
  let votesOptionTwo = 0;
  let totalVotes = 0;
  let percentageOptionOne = 0;
  let percentageOptionTwo = 0;

  const calculatePercentage = (votesFromOption, votesTotal) => {
    const figure = (parseFloat(votesFromOption / votesTotal) * 100).toPrecision(
      3,
    );
    return `${figure}%`;
  };

  if (question.optionOne) {
    votesOptionOne = question.optionOne.votes.length;
    votesOptionTwo = question.optionTwo.votes.length;
    totalVotes = votesOptionOne + votesOptionTwo;
    percentageOptionOne = calculatePercentage(
      question.optionOne.votes.length,
      totalVotes,
    );
    percentageOptionTwo = calculatePercentage(
      question.optionTwo.votes.length,
      totalVotes,
    );
  }

  return {
    question,
    authedUser,
    pollAuthor: users[question.author] || {},
    votesOptionOne,
    votesOptionTwo,
    totalVotes,
    percentageOptionOne,
    percentageOptionTwo,
  };
};
