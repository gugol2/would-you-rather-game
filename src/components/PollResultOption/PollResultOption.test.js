import { render, screen } from '@testing-library/react';
import { PollResultOption } from './PollResultOption';
import React from 'react';

describe('PollResultOption', () => {
  const percentageOption = '::percentageOption::';
  const votesOption = 1;
  const totalVotes = 2;
  const authedUser = '::authedUser::';
  const text = '::text::';
  let votes;

  test('should render the PollResultOption with the common nodes', () => {
    votes = [];
    const option = { votes, text };

    const props = {
      option,
      percentageOption,
      votesOption,
      totalVotes,
      authedUser,
    };
    render(<PollResultOption {...props} />);

    const pollResultsOptionText = screen.getByTestId(
      'poll-results-option-text',
    );
    const pollResultsOptionPercent = screen.getByTestId(
      'poll-results-option-percent',
    );
    const pollResultsOptionNumber = screen.getByTestId(
      'poll-results-option-number',
    );

    expect(pollResultsOptionText).toHaveTextContent(text);
    expect(pollResultsOptionPercent).toHaveTextContent(percentageOption);
    expect(pollResultsOptionNumber).toHaveTextContent(
      `${votesOption} out of ${totalVotes}`,
    );
  });

  test('should render the PollResultOption without the class active', () => {
    votes = [];
    const option = { votes, text };
    const props = {
      option,
      percentageOption,
      votesOption,
      totalVotes,
      authedUser,
    };
    render(<PollResultOption {...props} />);
    const pollResultsOptionSelected = screen.getByTestId(
      'poll-results-option-selected',
    );

    expect(pollResultsOptionSelected).not.toHaveClass('active');
  });

  test('should render the PollResultOption without the class active', () => {
    votes = [authedUser];
    const option = { votes, text };
    const props = {
      option,
      percentageOption,
      votesOption,
      totalVotes,
      authedUser,
    };
    render(<PollResultOption {...props} />);
    const pollResultsOptionSelected = screen.getByTestId(
      'poll-results-option-selected',
    );

    expect(pollResultsOptionSelected).toHaveClass('active');
  });
});
