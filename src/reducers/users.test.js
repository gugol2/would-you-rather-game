import { users } from './users';
import { RECEIVE_USERS } from '../actions/users';
import {
  SAVE_ANSWER_TO_QUESTION,
  REMOVE_ANSWER_TO_QUESTION,
  SAVE_QUESTION,
} from '../actions/questions';

describe('users reducer', () => {
  let initialState;
  const action = {};

  test('should return the initial users state when the action.type does not match', () => {
    initialState = {};
    action.type = '::anyType::';

    const reducedstate = users(initialState, action);

    expect(reducedstate).toEqual(initialState);
  });

  test('should return the initial users state extended with the users from the action when the action.type is RECEIVE_USERS', () => {
    const initialUser = {};
    initialState = { initialUser };

    const user1 = '::user1::';
    const user2 = '::user2::';
    const usersReceived = { user1, user2 };
    action.type = RECEIVE_USERS;
    action.users = usersReceived;

    const reducedstate = users(initialState, action);

    expect(reducedstate).toEqual({ initialUser, user1, user2 });
  });

  test('should return the initial users state extended with the new answer to question from the action when the action.type is SAVE_ANSWER_TO_QUESTION', () => {
    const answers = {};
    const user = '::user::';
    initialState = { [user]: { answers } };

    const qid = '::qid::';
    const answer = '::answer::';
    action.type = SAVE_ANSWER_TO_QUESTION;
    action.authedUser = user;
    action.qid = qid;
    action.answer = answer;

    const reducedstate = users(initialState, action);

    expect(reducedstate).toEqual({
      [user]: { answers: { [qid]: answer } },
    });
  });

  test('should return the initial users state minus the new answer to question from the action when the action.type is REMOVE_ANSWER_TO_QUESTION', () => {
    const user = '::user::';
    const answer = '::answer::';
    const qid = '::qid::';
    initialState = {
      [user]: { answers: { [qid]: answer } },
    };

    action.type = REMOVE_ANSWER_TO_QUESTION;
    action.authedUser = user;
    action.qid = qid;
    action.answer = answer;

    const reducedstate = users(initialState, action);

    expect(reducedstate).toEqual({ [user]: { answers: {} } });
  });

  test('should return the initial users state extended with the new question from the action when the action.type is SAVE_QUESTION', () => {
    const initialQuestion = {};
    const questions = [initialQuestion];

    const user = '::user::';
    initialState = { [user]: { questions } };

    const qid = '::qid::';
    action.type = SAVE_QUESTION;
    action.question = {
      author: user,
      id: qid,
    };

    const reducedstate = users(initialState, action);

    expect(reducedstate).toEqual({
      [user]: {
        questions: [initialQuestion, qid],
      },
    });
  });
});
