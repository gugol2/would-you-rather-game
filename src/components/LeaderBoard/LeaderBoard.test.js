import React from 'react';
import { LeaderBoard } from './LeaderBoard';
import { render, screen } from '@testing-library/react';
import { AvatarImage as MockAvatarImage } from '../AvatarImage';

jest.mock('../AvatarImage');

beforeEach(() => {
  MockAvatarImage.mockImplementation(({ user, size }) => {
    return (
      <div
        data-testid='avatar-image'
        data-user-name={user?.name}
        data-size={size}
      />
    );
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the LeaderBoard empty', () => {
  const usersOrderedByScore = [];
  render(<LeaderBoard usersOrderedByScore={usersOrderedByScore} />);

  const leaderBoardRendered = screen.getByTestId('leaderboard');
  const leaderBoardItem = screen.queryByTestId('leaderboarditem');
  expect(leaderBoardRendered).toBeInTheDocument();
  expect(leaderBoardItem).toBeNull();
});

test('renders the LeaderBoard with one user', () => {
  const id = '::id::';
  const answer = {};
  const answers = { answer };
  const questions = [];
  const name = '::name::';
  const user = { answers, questions, id, name };
  const usersOrderedByScore = [user];
  render(<LeaderBoard usersOrderedByScore={usersOrderedByScore} />);

  const leaderBoardItem = screen.getAllByTestId('leaderboarditem');
  expect(leaderBoardItem.length).toBe(1);

  const AvatarImageComponent = screen.getByTestId('avatar-image');
  expect(AvatarImageComponent).toBeInTheDocument();
  expect(AvatarImageComponent).toHaveAttribute('data-user-name', name);
  expect(AvatarImageComponent).toHaveAttribute('data-size', 'medium');

  const answeredQuestions = screen.getByTestId('answeredquestions');
  expect(answeredQuestions).toHaveTextContent(Object.keys(answers).length);
  const createdQuestions = screen.getByTestId('createdquestions');
  expect(createdQuestions).toHaveTextContent(questions.length);
  const score = screen.getByTestId('score');
  expect(score).toHaveTextContent(
    Object.keys(answers).length + questions.length,
  );
});
