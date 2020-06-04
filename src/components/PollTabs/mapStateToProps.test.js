import { mapStateToProps } from './mapStateToProps';

describe('adapter of the PollTabs component', () => {
  const users = '::users::';

  const author1 = '::author1::';
  const author2 = '::author2::';

  const questionOneOptionOneText = '::questionOneOptionOneText::';
  const questionOneOptionTwoText = '::questionOneOptionTwoText::';

  const questionTwoOptionOneText = '::questionTwoOptionOneText::';
  const questionTwoOptionTwoText = '::questionTwoOptionTwoText::';

  test('all questions are answered', () => {
    const question1 = {
      author: author1,
      id: 'question1',
      optionOne: { votes: [], text: questionOneOptionOneText },
      optionTwo: { votes: [author1, author2], text: questionOneOptionTwoText },
      timestamp: 1,
    };

    const question2 = {
      author: author2,
      id: 'question2',
      optionOne: { votes: [], text: questionTwoOptionOneText },
      optionTwo: { votes: [author1], text: questionTwoOptionTwoText },
      timestamp: 2,
    };

    const questions = { ['question1']: question1, ['question2']: question2 };
    const authedUser = author1;
    const state = { users, questions, authedUser };
    const adaptedStateToProps = mapStateToProps(state);

    expect(adaptedStateToProps).toEqual({
      users,
      answeredQuestions: [question2, question1],
      unAnsweredQuestions: [],
    });
  });

  test('all questions are unanswered and question1 is older than question2', () => {
    const question1 = {
      author: author1,
      id: 'question1',
      optionOne: { votes: [], text: questionOneOptionOneText },
      optionTwo: { votes: [], text: questionOneOptionTwoText },
      timestamp: 2,
    };

    const question2 = {
      author: author2,
      id: 'question2',
      optionOne: { votes: [], text: questionTwoOptionOneText },
      optionTwo: { votes: [author1], text: questionTwoOptionTwoText },
      timestamp: 1,
    };

    const questions = { ['question1']: question1, ['question2']: question2 };
    const authedUser = author2;
    const state = { users, questions, authedUser };
    const adaptedStateToProps = mapStateToProps(state);

    expect(adaptedStateToProps).toEqual({
      users,
      answeredQuestions: [],
      unAnsweredQuestions: [question1, question2],
    });
  });

  test('question1 is answered and question2 is unaswered', () => {
    const question1 = {
      author: author1,
      id: 'question1',
      optionOne: { votes: [], text: questionOneOptionOneText },
      optionTwo: { votes: [author2], text: questionOneOptionTwoText },
      timestamp: 1,
    };

    const question2 = {
      author: author2,
      id: 'question2',
      optionOne: { votes: [], text: questionTwoOptionOneText },
      optionTwo: { votes: [], text: questionTwoOptionTwoText },
      timestamp: 2,
    };

    const questions = { ['question1']: question1, ['question2']: question2 };
    const authedUser = author2;
    const state = { users, questions, authedUser };
    const adaptedStateToProps = mapStateToProps(state);

    expect(adaptedStateToProps).toEqual({
      users,
      answeredQuestions: [question1],
      unAnsweredQuestions: [question2],
    });
  });
});
