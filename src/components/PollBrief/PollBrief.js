import React from 'react';
import { PollHeader } from '../PollHeader';
import { AvatarImage } from '../AvatarImage';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PollBrief = ({ qauthor, question }) => {
  return (
    <div className='poll'>
      <PollHeader author={qauthor} />

      <div className='poll__body'>
        <div className='poll__left'>
          <AvatarImage user={qauthor} modifier='medium' />
        </div>

        <div className='poll__question'>
          <strong>Would your rather</strong>
          <div className='poll__question-text'>
            {`...${question.optionOne.text}...`}
          </div>
          <Link to={`/questions/${question.id}`} className='btn poll__button'>
            View Poll
          </Link>
        </div>
      </div>
    </div>
  );
};

PollBrief.propTypes = {
  qauthor: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
};
