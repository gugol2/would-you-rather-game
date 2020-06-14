import { mapStateToProps } from './mapToProps';
import { Question, User } from '../../types';

describe('mapToProps', () => {
  const qid = '::qid::';
  const authorId = '::authorId::';
  const author = {} as User;
  const votesOptionOne = ['userId1', 'userId2'];
  const votesOptionTwo = ['userId3', 'userId4', 'userId5'];
  const question = {
    optionOne: { votes: votesOptionOne },
    optionTwo: { votes: votesOptionTwo },
    author: authorId,
  } as Question;

  const questions = { [qid]: question };
  const authedUser = '::authedUser::';
  const users = { [authorId]: author };

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
