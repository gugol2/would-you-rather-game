import React from 'react';
import { render } from '@testing-library/react';
import { UnansweredPoll } from './UnansweredPoll';
import user from '@testing-library/user-event';

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

    const { queryAllByTestId, getByTestId } = render(
      <UnansweredPoll {...props} />,
    );

    const element = getByTestId('pollUnanswered');

    expect(element).toBeInTheDocument();

    const MockedAvatarImage = queryAllByTestId('mocked-avatar-image');
    expect(MockedAvatarImage).toHaveLength(1);
    expect(MockedAvatarImage[0]).toHaveAttribute('data-size', 'medium');
    expect(MockedAvatarImage[0]).toHaveAttribute(
      'data-user',
      JSON.stringify(pollAuthor),
    );

    const MockedPollHeader = queryAllByTestId('mocked-poll-header');
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

    const { getByLabelText } = render(<UnansweredPoll {...props} />);

    const optionOneInput = getByLabelText(textOptionOne);
    const optionTwoInput = getByLabelText(textOptionTwo);

    expect(optionOneInput).toBeChecked();
    expect(optionTwoInput).not.toBeChecked();
  });

  test('should select the second option', () => {
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

    const { getByLabelText } = render(<UnansweredPoll {...props} />);

    const optionOneInput = getByLabelText(textOptionOne);
    const optionTwoInput = getByLabelText(textOptionTwo);

    expect(optionOneInput).toBeChecked();
    expect(optionTwoInput).not.toBeChecked();

    user.click(optionTwoInput);

    expect(optionOneInput).not.toBeChecked();
    expect(optionTwoInput).toBeChecked();
  });

  test('should submit the poll', () => {
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

    const { getByRole } = render(<UnansweredPoll {...props} />);

    const submitButton = getByRole('button');

    user.click(submitButton);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      mockedHandleSaveAnswerToQuestionResponse,
    );
  });
});
