import React, { useState } from 'react';
import { PollHeader } from '../PollHeader';
import { AvatarImage } from '../AvatarImage';
import { handleSaveAnswerToQuestion } from '../../actions/questions';
import PropTypes from 'prop-types';

export const UnansweredPoll = ({
  question,
  pollAuthor,
  dispatch,
  authedUser,
}) => {
  const [selectedOption, setSelectedOption] = useState('optionOne');

  const { optionOne, optionTwo } = question;

  const handleChange = event => {
    setSelectedOption(event.target.value);
  };

  const saveQuestionAnswer = event => {
    event.preventDefault();

    dispatch(
      handleSaveAnswerToQuestion({
        authedUser,
        qid: question.id,
        answer: selectedOption,
      }),
    );
  };

  return (
    <div className='poll-unanswered' data-testid='pollUnanswered'>
      <PollHeader author={pollAuthor} />

      <div className='poll-unanswered__body'>
        <div className='poll-unanswered__left'>
          <AvatarImage user={pollAuthor} size='medium' />
        </div>

        <form
          className='poll-unanswered__question'
          onSubmit={saveQuestionAnswer}
        >
          <strong>Would your rather</strong>
          <label className='poll-unanswered__question-text'>
            <input
              type='radio'
              value='optionOne'
              checked={selectedOption === 'optionOne'}
              onChange={handleChange}
            />
            {optionOne && optionOne.text}
          </label>

          <label className='poll-unanswered__question-text'>
            <input
              type='radio'
              value='optionTwo'
              checked={selectedOption === 'optionTwo'}
              onChange={handleChange}
            />
            {optionTwo && optionTwo.text}
          </label>

          <button type='submit' className='btn poll-unanswered__button'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

UnansweredPoll.propTypes = {
  question: PropTypes.object.isRequired,
  pollAuthor: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  authedUser: PropTypes.string.isRequired,
};
