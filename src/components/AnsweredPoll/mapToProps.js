export const mapStateToProps = ({ questions, authedUser, users }, { qid }) => {
  const calculatePercentage = (votesFromOption, votesTotal) => {
    const figure = (parseFloat(votesFromOption / votesTotal) * 100).toPrecision(
      3,
    );
    return `${figure}%`;
  };

  const question = questions[qid];
  const { optionOne, optionTwo } = question;
  const votesOptionOne = optionOne.votes.length;
  const votesOptionTwo = optionTwo.votes.length;
  const totalVotes = votesOptionOne + votesOptionTwo;

  const percentageOptionOne = calculatePercentage(
    question.optionOne.votes.length,
    totalVotes,
  );
  const percentageOptionTwo = calculatePercentage(
    question.optionTwo.votes.length,
    totalVotes,
  );

  return {
    optionOne,
    optionTwo,
    authedUser,
    pollAuthor: users[question.author],
    votesOptionOne,
    votesOptionTwo,
    totalVotes,
    percentageOptionOne,
    percentageOptionTwo,
  };
};
