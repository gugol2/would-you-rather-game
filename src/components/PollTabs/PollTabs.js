import React, { useState } from 'react';
import { PollBrief } from '../PollBrief';
import PropTypes from 'prop-types';

export const PollTabs = props => {
  const [unansweredTab, setunansweredTab] = useState(true);
  const { unAnsweredQuestions, answeredQuestions, users } = props;

  const toggleTab = value => {
    setunansweredTab(value);
  };

  const questionsFromTab = unansweredTab
    ? unAnsweredQuestions
    : answeredQuestions;

  return (
    <div className="poll-tabs" data-testid="poll-tabs">
      <div className="poll-tabs__header">
        <div
          onClick={() => toggleTab(true)}
          className={unansweredTab ? 'poll-tabs__tab active' : 'poll-tabs__tab'}
        >
          Unanswered Questions
        </div>
        <div
          onClick={() => toggleTab(false)}
          className={unansweredTab ? 'poll-tabs__tab' : 'poll-tabs__tab active'}
        >
          Answered Questions
        </div>
      </div>

      <ul>
        {questionsFromTab.map(question => (
          <li key={question.id}>
            <PollBrief qauthor={users[question.author]} question={question} />
          </li>
        ))}

        {questionsFromTab.length === 0 && (
          <div className="poll-tabs__message">
            There are not any polls in this cathegory!!
          </div>
        )}
      </ul>
    </div>
  );
};

PollTabs.propTypes = {
  unAnsweredQuestions: PropTypes.array.isRequired,
  answeredQuestions: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
};
