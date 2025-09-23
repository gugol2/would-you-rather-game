import React from 'react';
import { render, screen } from '@testing-library/react';
import { UnansweredPoll } from './UnansweredPoll';
import userEvent from '@testing-library/user-event';

/* eslint-disable react/prop-types */

jest.mock('../AvatarImage', () => ({
  AvatarImage: ({ user, size }) => {
    return (
      <div
        data-testid='mocked-avatar-image'
        data-user={JSON.stringify(user)}
        data-size={size}
      />
    );
  },
}));

jest.mock('../PollHeader', () => ({
  PollHeader: () => (
    <div data-testid='mocked-poll-header'>Mocked PollHeader</div>
  ),
}));

const mockedHandleSaveAnswerToQuestionResponse =
  '::mockedHandleSaveAnswerToQuestionResponse::';

jest.mock('../../actions/questionsFunctions', () => ({
  handleSaveAnswerToQuestion: () => mockedHandleSaveAnswerToQuestionResponse,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('UnasnweredPoll component', () => {
  const dispatch = jest.fn();
  const authedUser = '::authedUser::';

  test('should render the component without failures', () => {
    const question = {};
    const pollAuthor = {};

    const props = {
      question,
      pollAuthor,
      dispatch,
      authedUser,
    };

    render(<UnansweredPoll {...props} />);

    const element = screen.getByTestId('pollUnanswered');

    expect(element).toBeInTheDocument();

    const MockedAvatarImage = screen.queryAllByTestId('mocked-avatar-image');
    expect(MockedAvatarImage).toHaveLength(1);
    expect(MockedAvatarImage[0]).toHaveAttribute('data-size', 'medium');
    expect(MockedAvatarImage[0]).toHaveAttribute(
      'data-user',
      JSON.stringify(pollAuthor),
    );

    const MockedPollHeader = screen.queryAllByTestId('mocked-poll-header');
    expect(MockedPollHeader).toHaveLength(1);
    expect(MockedPollHeader[0]).toHaveTextContent('Mocked PollHeader');
  });

  test('should select the first option by default', () => {
    const textOptionOne = '::textOptionOne::';
    const textOptionTwo = '::textOptionTwo::';

    const optionOne = { text: textOptionOne };
    const optionTwo = { text: textOptionTwo };

    const question = { optionOne, optionTwo };
    const pollAuthor = {};

    const props = {
      question,
      pollAuthor,
      dispatch,
      authedUser,
    };

    render(<UnansweredPoll {...props} />);

    const optionOneInput = screen.getByLabelText(textOptionOne);
    const optionTwoInput = screen.getByLabelText(textOptionTwo);

    expect(optionOneInput).toBeChecked();
    expect(optionTwoInput).not.toBeChecked();
  });

  test('should select the second option', async () => {
    const textOptionOne = '::textOptionOne::';
    const textOptionTwo = '::textOptionTwo::';

    const optionOne = { text: textOptionOne };
    const optionTwo = { text: textOptionTwo };

    const question = { optionOne, optionTwo };
    const pollAuthor = {};

    const props = {
      question,
      pollAuthor,
      dispatch,
      authedUser,
    };

    render(<UnansweredPoll {...props} />);

    const optionOneInput = screen.getByLabelText(textOptionOne);
    const optionTwoInput = screen.getByLabelText(textOptionTwo);

    expect(optionOneInput).toBeChecked();
    expect(optionTwoInput).not.toBeChecked();

    await userEvent.click(optionTwoInput);

    expect(optionOneInput).not.toBeChecked();
    expect(optionTwoInput).toBeChecked();
  });

  test('should submit the poll', async () => {
    const textOptionOne = '::textOptionOne::';
    const textOptionTwo = '::textOptionTwo::';

    const optionOne = { text: textOptionOne };
    const optionTwo = { text: textOptionTwo };

    const question = { optionOne, optionTwo };
    const pollAuthor = {};

    const props = {
      question,
      pollAuthor,
      dispatch,
      authedUser,
    };

    render(<UnansweredPoll {...props} />);

    const submitButton = screen.getByRole('button');

    await userEvent.click(submitButton);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      mockedHandleSaveAnswerToQuestionResponse,
    );
  });
});
