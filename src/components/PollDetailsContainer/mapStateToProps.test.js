import { mapStateToProps } from './mapStateToProps';

describe('adapter of state to props for the PollDetails component', () => {
  const authedUser = '::authedUser::';
  const questionId = '::questionId::';
  const id = '::id::';

  const match = {
    params: {
      question_id: questionId,
    },
  };

  const props = { match };

  test('the question_id does NOT MATCH any questions from the state', () => {
    const question1 = {
      id,
      optionOne: { votes: [] },
      optionTwo: { votes: [authedUser] },
    };

    const question2 = {
      id,
      optionOne: { votes: [authedUser] },
      optionTwo: { votes: [] },
    };

    const questions = { ['question1']: question1, ['question2']: question2 };

    const state = { questions, authedUser };
    const adaptedProps = mapStateToProps(state, props);

    expect(adaptedProps).toEqual({ qid: undefined, answered: undefined });
  });

  test('the question_id MATCHES a question from the state BUT it has not been answered by the authedUser', () => {
    const question1 = {
      id: questionId,
      optionOne: { votes: [] },
      optionTwo: { votes: [] },
    };

    const question2 = {
      id,

      optionOne: { votes: [] },
      optionTwo: { votes: [authedUser] },
    };

    const questions = { [questionId]: question1, ['question2']: question2 };

    const state = { questions, authedUser };
    const adaptedProps = mapStateToProps(state, props);

    expect(adaptedProps).toEqual({ qid: questionId, answered: false });
  });

  test('the question_id MATCHES a question from the state AND it has been answered by the authedUser', () => {
    const question1 = {
      id,
      optionOne: { votes: [] },
      optionTwo: { votes: [] },
    };

    const question2 = {
      id: questionId,
      optionOne: { votes: [] },
      optionTwo: { votes: [authedUser] },
    };

    const questions = { ['question1']: question1, [questionId]: question2 };

    const state = { questions, authedUser };
    const adaptedProps = mapStateToProps(state, props);

    expect(adaptedProps).toEqual({ qid: questionId, answered: true });
  });
});
