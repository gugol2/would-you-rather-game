import { mapStateToProps } from './mapToProps';

test('should adapt the state to props with the default values', () => {
  const questions = '::questions::';
  const authedUser = '::authedUser::';
  const users = '::users::';
  const qid = '::qid::';

  const adaptedStateToProps = mapStateToProps(
    {
      questions,
      authedUser,
      users,
    },
    { qid },
  );

  expect(adaptedStateToProps).toEqual({
    question: {},
    authedUser,
    pollAuthor: {},
  });
});

test('should adapt the state to props with the default values', () => {
  const qid = '::qid::';
  const author = '::author::';
  const anyQuestion = { author };
  const questions = { [qid]: anyQuestion };
  const authedUser = '::authedUser::';
  const authorOfPoll = '::authorOfPoll::';
  const users = {
    [author]: authorOfPoll,
  };

  const adaptedStateToProps = mapStateToProps(
    {
      questions,
      authedUser,
      users,
    },
    { qid },
  );

  expect(adaptedStateToProps).toEqual({
    question: anyQuestion,
    authedUser,
    pollAuthor: authorOfPoll,
  });
});
