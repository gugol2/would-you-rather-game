import React from 'react';
import { screen } from '@testing-library/react';
import { PollBrief } from './PollBrief';
import { renderWithRouter } from '../../testHelpers/renderWithRouter';

/* eslint-disable react/prop-types */

jest.mock('../PollHeader', () => ({
  PollHeader: ({ author }) => (
    <div data-testid='mocked-poll-header' data-author={JSON.stringify(author)}>
      Mocked PollHeader
    </div>
  ),
}));

jest.mock('../AvatarImage', () => ({
  AvatarImage: ({ user, size }) => (
    <div
      data-testid='mocked-avatar-image'
      data-user={JSON.stringify(user)}
      data-size={size}
    >
      Mocked AvatarImage
    </div>
  ),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to }) => (
    <div data-testid='mocked-link' data-to={JSON.stringify(to)}>
      Mocked Link
    </div>
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('PollBrief', () => {
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

    renderWithRouter(<PollBrief {...props} />);
    const pollQuestionText = screen.getByTestId('poll-question-text');

    expect(pollQuestionText).toHaveTextContent(textOptionOne);

    const MockedPollHeader = screen.getByTestId('mocked-poll-header');
    expect(MockedPollHeader).toBeInTheDocument();
    expect(MockedPollHeader).toHaveAttribute(
      'data-author',
      JSON.stringify(qauthor),
    );

    const MockedAvatarImage = screen.getByTestId('mocked-avatar-image');
    expect(MockedAvatarImage).toBeInTheDocument();
    expect(MockedAvatarImage).toHaveAttribute(
      'data-user',
      JSON.stringify(qauthor),
    );
    expect(MockedAvatarImage).toHaveAttribute('data-size', 'medium');

    const MockedLink = screen.getByTestId('mocked-link');
    expect(MockedLink).toBeInTheDocument();
    expect(MockedLink).not.toHaveClass();
    const expectedDataToAttribute = MockedLink.getAttribute('data-to');
    expect(JSON.parse(expectedDataToAttribute)).toBe(
      `/questions/${question.id}`,
    );
  });
});
