import { render } from '@testing-library/react';
import { PollDetailsContainer } from './PollDetailsContainer';
import React from 'react';
import { ConnectedUnansweredPoll as MockedUnansweredPoll } from '../UnansweredPoll';
import { ConnectedAnsweredPoll as MockedAnsweredPoll } from '../AnsweredPoll';
import { NoMatch as MockedNoMatch } from '../NoMatch';

jest.mock('../UnansweredPoll', () => ({
  ConnectedUnansweredPoll: jest.fn(() => <>Mocked Unanswered Poll</>),
}));

jest.mock('../AnsweredPoll', () => ({
  ConnectedAnsweredPoll: jest.fn(() => <>Mocked Answered Poll</>),
}));

jest.mock('../NoMatch', () => ({
  NoMatch: jest.fn(() => <>Mocked NoMatch</>),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('PollDetailsContainer', () => {
  const context = {};
  let answered = undefined;
  let qid = undefined;

  test.skip('should render NoMatch when the qid is falsy', () => {
    const props = {
      answered,
      qid,
    };

    render(<PollDetailsContainer {...props} />);

    expect(MockedUnansweredPoll).not.toHaveBeenCalled();
    expect(MockedAnsweredPoll).not.toHaveBeenCalled();
    expect(MockedNoMatch).toHaveBeenCalledTimes(1);
    expect(MockedNoMatch).toHaveBeenCalledWith({}, context);
  });

  test.skip('should render UnansweredPoll when the qid is truthy and answered is falsy', () => {
    qid = '::qid::';
    answered = false;
    const props = {
      answered,
      qid,
    };

    render(<PollDetailsContainer {...props} />);

    expect(MockedUnansweredPoll).toHaveBeenCalledTimes(1);
    expect(MockedUnansweredPoll).toHaveBeenCalledWith({ qid }, context);
    expect(MockedAnsweredPoll).not.toHaveBeenCalled();
    expect(MockedNoMatch).not.toHaveBeenCalled();
  });

  test.skip('should render AnsweredPoll when the qid and answered are truthy', () => {
    qid = '::qid::';
    answered = true;
    const props = {
      answered,
      qid,
    };

    render(<PollDetailsContainer {...props} />);

    expect(MockedAnsweredPoll).toHaveBeenCalledTimes(1);
    expect(MockedAnsweredPoll).toHaveBeenCalledWith({ qid }, context);
    expect(MockedUnansweredPoll).not.toHaveBeenCalled();
    expect(MockedNoMatch).not.toHaveBeenCalled();
  });
});
