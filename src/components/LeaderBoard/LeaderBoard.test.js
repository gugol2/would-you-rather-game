import React from 'react';
import { LeaderBoard } from './LeaderBoard';
import { render } from '@testing-library/react';

const MockAvatarImage = jest.fn(() => <>MockedAvatarImage</>);

jest.mock('../AvatarImage', () => ({
  AvatarImage: ({ user, size }) => {
    MockAvatarImage({ user, size });

    return (
      <div
        data-testid='avatar-image'
        data-user-name={user?.name}
        data-size={size}
      />
    );
  },
}));

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

test('renders the LeaderBoard with one user', () => {
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

  expect(MockAvatarImage).toHaveBeenCalledTimes(1);
  expect(MockAvatarImage).toHaveBeenCalledWith({ user, size: 'medium' });

  const answeredQuestions = getByTestId('answeredquestions');
  expect(answeredQuestions).toHaveTextContent(Object.keys(answers).length);
  const createdQuestions = getByTestId('createdquestions');
  expect(createdQuestions).toHaveTextContent(questions.length);
  const score = getByTestId('score');
  expect(score).toHaveTextContent(
    Object.keys(answers).length + questions.length,
  );
});
