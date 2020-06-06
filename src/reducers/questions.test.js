import { questions } from './questions';
import {
  SAVE_QUESTION,
  SAVE_ANSWER_TO_QUESTION,
  REMOVE_ANSWER_TO_QUESTION,
  RECEIVE_QUESTIONS,
} from '../actions/questions';

describe('questions reducer', () => {
  let initialState;
  const action = {};

  test('should return the intial question state extended with action.questions when the action.type is RECEIVE_QUESTIONS', () => {
    const initialQuestion = {};
    const question1 = {};
    const question2 = {};

    initialState = { initialQuestion };

    action.type = RECEIVE_QUESTIONS;
    action.questions = { question1, question2 };

    const reducedState = questions(initialState, action);

    expect(reducedState).toEqual({
      initialQuestion: {},
      question1: {},
      question2: {},
    });
  });

  test('should return the intial question state extended with action.question when the action.type is SAVE_QUESTION', () => {
    const id = '::id::';
    const question = {};
    initialState = {};

    action.type = SAVE_QUESTION;
    action.question = question;
    action.qid = id;

    const reducedState = questions(initialState, action);

    expect(reducedState).toEqual({ [id]: question });
  });

  test('should return the intial question state extended with action.answer when the action.type is SAVE_ANSWER_TO_QUESTION', () => {
    const id = '::id::';
    const authedUser = '::authedUser::';
    const votesOptionOne = [];
    const votesOptionTwo = [];

    initialState = {
      [id]: {
        optionOne: { votes: votesOptionOne },
        optionTwo: { votes: votesOptionTwo },
      },
    };

    action.type = SAVE_ANSWER_TO_QUESTION;
    action.qid = id;
    action.answer = 'optionOne';
    action.authedUser = authedUser;

    const reducedState = questions(initialState, action);

    expect(reducedState).toEqual({
      [id]: {
        optionOne: { votes: [authedUser] },
        optionTwo: { votes: [] },
      },
    });
  });

  test('should return the intial question state minus the action.answer when the action.type is REMOVE_ANSWER_TO_QUESTION', () => {
    const id = '::id::';
    const authedUser = '::authedUser::';
    const votesOptionOne = [];
    const votesOptionTwo = [authedUser];

    initialState = {
      [id]: {
        optionOne: { votes: votesOptionOne },
        optionTwo: { votes: votesOptionTwo },
      },
    };

    action.type = REMOVE_ANSWER_TO_QUESTION;
    action.qid = id;
    action.answer = 'optionTwo';
    action.authedUser = authedUser;

    const reducedState = questions(initialState, action);

    expect(reducedState).toEqual({
      [id]: {
        optionOne: { votes: [] },
        optionTwo: { votes: [] },
      },
    });
  });

  test('should return the intial question state when the action.type does not match', () => {
    initialState = '::initialState::';
    action.type = '::type::';

    const reducedState = questions(initialState, action);

    expect(reducedState).toEqual(initialState);
  });

  test('should return the default question state when the action.type does not match and state is not defined', () => {
    initialState = undefined;
    action.type = '::type::';

    const reducedState = questions(initialState, action);

    expect(reducedState).toEqual({});
  });
});
