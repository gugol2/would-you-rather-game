import React from 'react';
import { PollBrief } from './PollBrief';
import { renderWithRouter } from '../../testHelpers/renderWithRouter';
import { PollHeader as MockedPollHeader } from '../PollHeader';
import { AvatarImage as MockedAvatarImage } from '../AvatarImage';
import { Link as MockedLink } from 'react-router-dom';

jest.mock('../PollHeader', () => ({
  PollHeader: jest.fn(() => <>Mocked PollHeader</>),
}));

jest.mock('../AvatarImage', () => ({
  AvatarImage: jest.fn(() => <>Mocked AvatarImage</>),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(() => <>Mocked Link</>),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('PollBrief', () => {
  const context = {};

  test('should render the PollBrief', () => {
    const textOptionOne = '::textOptionOne::';
    const textOptionTwo = '::textOptionTwo::';
    const id = '::id::';
    const optionOne = { text: textOptionOne };
    const optionTwo = { text: textOptionTwo };
    const qauthor = {};
    const question = {
      id,
      optionOne,
      optionTwo,
    };

    const props = {
      qauthor,
      question,
    };

    const { debug, getByTestId } = renderWithRouter(<PollBrief {...props} />);
    const pollQuestionText = getByTestId('poll-question-text');

    expect(MockedPollHeader).toHaveBeenCalledTimes(1);
    expect(MockedPollHeader).toHaveBeenCalledWith({ author: qauthor }, context);
    expect(MockedAvatarImage).toHaveBeenCalledTimes(1);
    expect(MockedAvatarImage).toHaveBeenCalledWith(
      {
        user: qauthor,
        modifier: expect.any(String),
      },
      context,
    );

    expect(pollQuestionText).toHaveTextContent(textOptionOne);

    expect(MockedLink).toHaveBeenCalledTimes(1);
    expect(MockedLink).toHaveBeenCalledWith(
      {
        children: expect.stringMatching(/view poll/i),
        className: expect.any(String),
        to: `/questions/${question.id}`,
      },
      context,
    );
    debug();
  });
});
