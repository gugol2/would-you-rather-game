import React from 'react';
import PropTypes from 'prop-types';

export const PollResultOption = ({
  option,
  percentageOption,
  votesOption,
  totalVotes,
  authedUser,
}) => {
  return (
    <div
      className={`poll-results__option ${
        option && option.votes.includes(authedUser) ? 'active' : ''
      }`}
    >
      <div className='poll-results__option-text'>{option && option.text}</div>
      <div className='poll-results__option-percent'>{percentageOption}</div>
      <div className='poll-results__option-number'>
        {`${votesOption} out of ${totalVotes}`}
      </div>
    </div>
  );
};

PollResultOption.propTypes = {
  option: PropTypes.object.isRequired,
  percentageOption: PropTypes.string.isRequired,
  votesOption: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
  authedUser: PropTypes.string.isRequired,
};
