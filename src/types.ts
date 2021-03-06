import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from './actions/authedUser';
import { RECEIVE_USERS } from './actions/users';
import {
  RECEIVE_QUESTIONS,
  SAVE_ANSWER_TO_QUESTION,
  REMOVE_ANSWER_TO_QUESTION,
  SAVE_QUESTION,
} from './actions/questions';
import { store } from './store';

interface SetAuthedUserAction {
  type: typeof SET_AUTHED_USER;
  id: string;
}

interface LogOutAuthedUserAction {
  type: typeof LOGOUT_AUTHED_USER;
}

export type AuthedUserState = string | null;

export type AuthedUsersActionTypes =
  | SetAuthedUserAction
  | LogOutAuthedUserAction;

// Users

export type Answer = 'optionOne' | 'optionTwo';
export interface User {
  answers: { [key: string]: Answer };
  avatarURL: string;
  id: string;
  name: string;
  questions: string[];
}

export interface UsersState {
  [key: string]: User;
}

export interface ReceiveUsersAction {
  type: typeof RECEIVE_USERS;
  users: UsersState;
}

// Questions
export interface Question {
  author: string;
  id: string;
  optionOne: Option;
  optionTwo: Option;
  timestamp: number;
  [key: string]: any;
}

export interface Option {
  votes: string[];
  text: string;
}

export interface QuestionsState {
  [key: string]: Question;
}

interface ReceiveQuestionsAction {
  type: typeof RECEIVE_QUESTIONS;
  questions: QuestionsState;
}

interface SaveAnswerToQuestionAction {
  type: typeof SAVE_ANSWER_TO_QUESTION;
  qid: string;
  answer: Answer;
  authedUser: string;
}

interface RemoveAnswerToQuestionAction {
  type: typeof REMOVE_ANSWER_TO_QUESTION;
  qid: string;
  answer: Answer;
  authedUser: string;
}

interface SaveQuestionAction {
  type: typeof SAVE_QUESTION;
  qid: string;
  question: Question;
}

export type QuestionsActionTypes =
  | ReceiveQuestionsAction
  | SaveAnswerToQuestionAction
  | RemoveAnswerToQuestionAction
  | SaveQuestionAction;

// LoadingBar
interface LoadingBarState {
  default: number;
}

// Redux State
export interface ReduxState {
  users: UsersState;
  questions: QuestionsState;
  authedUser: AuthedUserState;
  loadingBar: LoadingBarState;
}

// dispatch
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;

// match
export type { RouteComponentProps } from 'react-router-dom';
