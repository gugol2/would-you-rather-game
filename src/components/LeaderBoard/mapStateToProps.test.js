import { mapStateToProps } from './mapStateToProps';

describe('LeaderBoard adapter', () => {
  const user1 = {
    id: 'user1',
    answers: {
      question1: {},
      question2: {},
      question3: {},
      question4: {},
    },
    questions: new Array(2),
  };

  const user2 = {
    id: 'user2',
    answers: {
      question5: {},
    },
    questions: new Array(3),
  };

  const user3 = {
    id: 'user3',
    answers: {
      question3: {},
      question4: {},
    },
    questions: new Array(3),
  };

  test('should map the state to props', () => {
    const users = {
      user1,
      user2,
      user3,
    };
    const usersOrderedByScore = [user1, user3, user2];

    const mappedProps = mapStateToProps({ users });

    expect(mappedProps).toEqual({ usersOrderedByScore });
  });
});
