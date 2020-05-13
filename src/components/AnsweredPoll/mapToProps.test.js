import { mapStateToProps } from './mapToProps';

describe('mapToProps', () => {
  const qid = '::qid::';
  const author = '::author::';
  const votesOptionOne = [1, 2];
  const votesOptionTwo = [3, 4, 5];
  const question = {
    optionOne: { votes: votesOptionOne },
    optionTwo: { votes: votesOptionTwo },
    author,
  };

  const questions = { [qid]: question };
  const authedUser = '::authedUser::';
  const users = { [author]: author };

  test('should return the state mapped to props', () => {
    const mappedProps = mapStateToProps(
      { questions, authedUser, users },
      { qid },
    );

    expect(mappedProps).toEqual({
      authedUser: '::authedUser::',
      percentageOptionOne: '40.0%',
      percentageOptionTwo: '60.0%',
      pollAuthor: author,
      optionOne: {
        votes: votesOptionOne,
      },
      optionTwo: {
        votes: votesOptionTwo,
      },
      totalVotes: 5,
      votesOptionOne: 2,
      votesOptionTwo: 3,
    });
  });
});
