import React from 'react';
import { LeaderBoard } from './LeaderBoard';
import { render } from '@testing-library/react';
import { AvatarImage as MockedAvatarImage } from '../AvatarImage';

jest.mock('../AvatarImage', () => {
  return {
    AvatarImage: jest.fn(() => <>MockedAvatarImage</>),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the LeaderBoard empty', () => {
  const usersOrderedByScore = [];
  const { getByTestId, queryByTestId } = render(
    <LeaderBoard usersOrderedByScore={usersOrderedByScore} />,
  );

  const leaderBoardRendered = getByTestId('leaderboard');
  const leaderBoardItem = queryByTestId('leaderboarditem');
  expect(leaderBoardRendered).toBeInTheDocument();
  expect(leaderBoardItem).toBeNull();
});

test.skip('renders the LeaderBoard with one user', () => {
  const context = {};
  const id = '::id::';
  const answer = {};
  const answers = { answer };
  const questions = [];
  const user = { answers, questions, id };
  const usersOrderedByScore = [user];
  const { getByTestId, getAllByTestId } = render(
    <LeaderBoard usersOrderedByScore={usersOrderedByScore} />,
  );

  const leaderBoardItem = getAllByTestId('leaderboarditem');
  expect(leaderBoardItem.length).toBe(1);

  expect(MockedAvatarImage).toHaveBeenCalledTimes(1);
  expect(MockedAvatarImage).toHaveBeenCalledWith(
    { user, size: 'medium' },
    context,
  );

  const answeredQuestions = getByTestId('answeredquestions');
  expect(answeredQuestions).toHaveTextContent(Object.keys(answers).length);
  const createdQuestions = getByTestId('createdquestions');
  expect(createdQuestions).toHaveTextContent(questions.length);
  const score = getByTestId('score');
  expect(score).toHaveTextContent(
    Object.keys(answers).length + questions.length,
  );
});
