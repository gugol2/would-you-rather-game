import React from 'react';
import { render, screen } from '@testing-library/react';
import { UnansweredPoll } from './UnansweredPoll';
import { AvatarImage as MockedAvatarImage } from '../AvatarImage';
import { PollHeader as MockedPollHeader } from '../PollHeader';
import user from '@testing-library/user-event';

jest.mock('../AvatarImage', () => ({
  AvatarImage: jest.fn(() => <>Mocked AvatarImage</>),
}));

jest.mock('../PollHeader', () => ({
  PollHeader: jest.fn(() => <>Mocked PollHeader</>),
}));

const mockedHandleSaveAnswerToQuestionResponse =
  '::mockedHandleSaveAnswerToQuestionResponse::';

jest.mock('../../actions/questionsFunctions', () => ({
  handleSaveAnswerToQuestion: jest.fn(
    () => mockedHandleSaveAnswerToQuestionResponse,
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('UnasnweredPoll component', () => {
  const dispatch = jest.fn();
  const authedUser = '::authedUser::';
  const context = {};

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

    expect(MockedAvatarImage).toHaveBeenCalledTimes(1);
    expect(MockedAvatarImage).toHaveBeenCalledWith(
      {
        size: 'medium',
        user: pollAuthor,
      },
      context,
    );

    expect(MockedPollHeader).toHaveBeenCalledTimes(1);
    expect(MockedPollHeader).toHaveBeenCalledWith(
      {
        author: pollAuthor,
      },
      context,
    );
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

    render(<UnansweredPoll {...props} />);

    const optionOneInput = screen.getByLabelText(textOptionOne);
    const optionTwoInput = screen.getByLabelText(textOptionTwo);

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

    render(<UnansweredPoll {...props} />);

    const submitButton = screen.getByRole('button');

    user.click(submitButton);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      mockedHandleSaveAnswerToQuestionResponse,
    );
  });
});
