import { Question, User, AuthedUserState, Option } from '../../types';

export const mapStateToProps = (
  {
    questions,
    authedUser,
    users,
  }: {
    questions: { [key: string]: Question };
    users: { [key: string]: User };
    authedUser: AuthedUserState;
  },
  { qid }: { qid: string },
): {
  optionOne: Option;
  optionTwo: Option;
  authedUser: AuthedUserState;
  pollAuthor: User;
  votesOptionOne: number;
  votesOptionTwo: number;
  totalVotes: number;
  percentageOptionOne: string;
  percentageOptionTwo: string;
} => {
  const calculatePercentage = (
    votesFromOption: number,
    votesTotal: number,
  ): string => {
    const percentaje = votesFromOption / votesTotal;
    const figure = (parseFloat(percentaje.toString()) * 100).toPrecision(3);
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
