import { render } from '@testing-library/react';
import { PollDetailsContainer } from './PollDetailsContainer';
import React from 'react';

/* eslint-disable react/prop-types */

jest.mock('../UnansweredPoll', () => ({
  ConnectedUnansweredPoll: ({ qid }) => (
    <div data-testid='mocked-unanswered-poll' data-qid={qid}>
      Mocked Unanswered Poll{' '}
    </div>
  ),
}));

jest.mock('../AnsweredPoll', () => ({
  ConnectedAnsweredPoll: ({ qid }) => (
    <div data-testid='mocked-answered-poll' data-qid={qid}>
      Mocked Answered Poll
    </div>
  ),
}));

jest.mock('../NoMatch', () => ({
  NoMatch: () => <div data-testid='mocked-no-match'>Mocked NoMatch</div>,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('PollDetailsContainer', () => {
  let answered = undefined;
  let qid = undefined;

  test('should render NoMatch when the qid is falsy', () => {
    const props = {
      answered,
      qid,
    };

    const { queryByTestId } = render(<PollDetailsContainer {...props} />);

    const MockedUnansweredPoll = queryByTestId('mocked-unanswered-poll');
    expect(MockedUnansweredPoll).not.toBeInTheDocument();
    const MockedAnsweredPoll = queryByTestId('mocked-answered-poll');
    expect(MockedAnsweredPoll).not.toBeInTheDocument();

    const MockedNoMatch = queryByTestId('mocked-no-match');
    expect(MockedNoMatch).toBeInTheDocument();
    expect(MockedNoMatch).toHaveTextContent('Mocked NoMatch');
  });

  test('should render UnansweredPoll when the qid is truthy and answered is falsy', () => {
    qid = '::qid::';
    answered = false;
    const props = {
      answered,
      qid,
    };

    const { queryByTestId } = render(<PollDetailsContainer {...props} />);

    const MockedUnansweredPoll = queryByTestId('mocked-unanswered-poll');
    expect(MockedUnansweredPoll).toBeInTheDocument();
    expect(MockedUnansweredPoll).toHaveAttribute('data-qid', qid);

    const MockedAnsweredPoll = queryByTestId('mocked-answered-poll');
    expect(MockedAnsweredPoll).not.toBeInTheDocument();

    const MockedNoMatch = queryByTestId('mocked-no-match');
    expect(MockedNoMatch).not.toBeInTheDocument();
  });

  test('should render AnsweredPoll when the qid and answered are truthy', () => {
    qid = '::qid::';
    answered = true;
    const props = {
      answered,
      qid,
    };

    const { queryByTestId } = render(<PollDetailsContainer {...props} />);

    const MockedAnsweredPoll = queryByTestId('mocked-answered-poll');
    expect(MockedAnsweredPoll).toBeInTheDocument();
    expect(MockedAnsweredPoll).toHaveAttribute('data-qid', qid);

    const MockedUnansweredPoll = queryByTestId('mocked-unanswered-poll');
    expect(MockedUnansweredPoll).not.toBeInTheDocument();

    const MockedNoMatch = queryByTestId('mocked-no-match');
    expect(MockedNoMatch).not.toBeInTheDocument();
  });
});
