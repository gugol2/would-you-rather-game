import { AnsweredPoll } from './AnsweredPoll';
import { render } from '@testing-library/react';
import React from 'react';
import { PollHeader as MockedPollHeader } from '../PollHeader';
import { AvatarImage as MockedAvatarImage } from '../AvatarImage';
import { PollResultOption as MockedPollResultOption } from '../PollResultOption';

jest.mock('../PollHeader', () => ({
  PollHeader: jest.fn(() => <>Mocked PollHeader</>),
}));

jest.mock('../PollResultOption', () => ({
  PollResultOption: jest.fn(() => <>Mocked PollResultOption</>),
}));

jest.mock('../AvatarImage', () => ({
  AvatarImage: jest.fn(() => <>Mocked AvatarImage</>),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test.skip('renders the AnsweredPoll component', () => {
  const optionOne = { ['::optionOne::']: {} };
  const optionTwo = { ['::optionTwo::']: {} };
  const pollAuthor = {};
  const votesOptionOne = 1;
  const votesOptionTwo = 2;
  const totalVotes = 3;
  const percentageOptionOne = '::percentageOptionOne::';
  const percentageOptionTwo = '::percentageOptionTwo::';
  const authedUser = '::authedUser::';
  const context = {};

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

  render(<AnsweredPoll {...props} />);
  expect(MockedPollHeader).toHaveBeenCalledTimes(1);
  expect(MockedPollHeader).toHaveBeenCalledWith(
    { author: pollAuthor },
    context,
  );

  expect(MockedAvatarImage).toHaveBeenCalledTimes(1);
  expect(MockedAvatarImage).toHaveBeenCalledWith(
    {
      user: pollAuthor,
      size: expect.any(String),
    },
    context,
  );

  expect(MockedPollResultOption).toHaveBeenCalledTimes(2);
  expect(MockedPollResultOption).toHaveBeenNthCalledWith(
    1,
    {
      authedUser,
      option: optionOne,
      percentageOption: percentageOptionOne,
      totalVotes,
      votesOption: votesOptionOne,
    },
    context,
  );

  expect(MockedPollResultOption).toHaveBeenNthCalledWith(
    2,
    {
      authedUser,
      option: optionTwo,
      percentageOption: percentageOptionTwo,
      totalVotes,
      votesOption: votesOptionTwo,
    },
    context,
  );
});
