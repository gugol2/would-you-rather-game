import { render } from '@testing-library/react';
import React from 'react';
import { AnsweredPoll } from './AnsweredPoll';

/* eslint-disable react/prop-types */
jest.mock('../PollHeader', () => ({
  PollHeader: ({ author }) => (
    <div
      data-testid='poll-header'
      data-author-name={author?.name}
      data-author-id={author?.id}
    >
      Mocked PollHeader
    </div>
  ),
}));

jest.mock('../PollResultOption', () => ({
  PollResultOption: ({
    option,
    percentageOption,
    votesOption,
    totalVotes,
    authedUser,
  }) => (
    <div
      data-testid='poll-result-option'
      data-option={Object.keys(option)[0]}
      data-percentage={percentageOption}
      data-votes={votesOption}
      data-total={totalVotes}
      data-authed-user={authedUser}
    >
      Mocked PollResultOption
    </div>
  ),
}));

jest.mock('../AvatarImage', () => ({
  AvatarImage: ({ user, size }) => {
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

test('renders the AnsweredPoll component', () => {
  const optionOne = { ['::optionOne::']: {} };
  const optionTwo = { ['::optionTwo::']: {} };
  const pollAuthor = { name: '::authorName::', id: '::authorId::' };
  const votesOptionOne = 1;
  const votesOptionTwo = 2;
  const totalVotes = 3;
  const percentageOptionOne = '::percentageOptionOne::';
  const percentageOptionTwo = '::percentageOptionTwo::';
  const authedUser = '::authedUser::';

  const props = {
    optionOne,
    optionTwo,
    pollAuthor,
    votesOptionOne,
    votesOptionTwo,
    totalVotes,
    percentageOptionOne,
    percentageOptionTwo,
    authedUser,
  };

  const { getByTestId, getAllByTestId } = render(<AnsweredPoll {...props} />);
  const MockedPollHeader = getByTestId('poll-header');
  expect(MockedPollHeader).toBeInTheDocument();
  expect(MockedPollHeader).toHaveAttribute('data-author-name', pollAuthor.name);
  expect(MockedPollHeader).toHaveAttribute('data-author-id', pollAuthor.id);

  const MockedAvatarImage = getByTestId('avatar-image');
  expect(MockedAvatarImage).toBeInTheDocument();
  expect(MockedAvatarImage).toHaveAttribute('data-user-name', pollAuthor.name);
  expect(MockedAvatarImage).toHaveAttribute('data-size', 'medium');

  const MockedPollResultOption = getAllByTestId('poll-result-option');
  expect(MockedPollResultOption).toHaveLength(2);

  expect(MockedPollResultOption[0]).toHaveAttribute(
    'data-option',
    '::optionOne::',
  );
  expect(MockedPollResultOption[0]).toHaveAttribute(
    'data-percentage',
    percentageOptionOne,
  );
  expect(MockedPollResultOption[0]).toHaveAttribute(
    'data-votes',
    votesOptionOne.toString(),
  );
  expect(MockedPollResultOption[0]).toHaveAttribute(
    'data-total',
    totalVotes.toString(),
  );
  expect(MockedPollResultOption[0]).toHaveAttribute(
    'data-authed-user',
    authedUser,
  );

  expect(MockedPollResultOption[1]).toHaveAttribute(
    'data-option',
    '::optionTwo::',
  );
  expect(MockedPollResultOption[1]).toHaveAttribute(
    'data-percentage',
    percentageOptionTwo,
  );
  expect(MockedPollResultOption[1]).toHaveAttribute(
    'data-votes',
    votesOptionTwo.toString(),
  );
  expect(MockedPollResultOption[1]).toHaveAttribute(
    'data-total',
    totalVotes.toString(),
  );
  expect(MockedPollResultOption[1]).toHaveAttribute(
    'data-authed-user',
    authedUser,
  );
});
