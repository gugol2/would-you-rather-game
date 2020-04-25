import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AddPoll = ({ dispatchSaveNewQuestion, authedUser }) => {
  const [optionTexts, setOptionTexts] = useState({
    optionOneText: '',
    optionTwoText: '',
  });

  let history = useHistory();

  const handleoOtionTexts = ({ target }) => {
    const { name, value } = target;

    setOptionTexts({
      ...optionTexts,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { optionOneText, optionTwoText } = optionTexts;
    dispatchSaveNewQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then(() => {
      setOptionTexts({
        optionOneText: '',
        optionTwoText: '',
      });
      history.push('/');
    });
  };

  return (
    <div className='poll-add'>
      <div className='poll-add__header'>Create New Question</div>

      <div className='poll-add__body'>
        <div className='poll-add__body-instructions'>
          Complete the question:
        </div>
        <div className='poll-add__body-title'>Would you rather ...</div>

        <form onSubmit={handleSubmit} className='poll-add__body-form'>
          <input
            type='text'
            name='optionOneText'
            id='optionOneText'
            placeholder='Enter Option One Text Here...'
            value={optionTexts.optionOneText}
            onChange={handleoOtionTexts}
            className='poll-add__body-form-input'
          />

          <div className='poll-add__body-form-or'>OR</div>

          <input
            type='text'
            name='optionTwoText'
            id='optionTwoText'
            placeholder='Enter Option Two Text Here...'
            value={optionTexts.optionTwoText}
            onChange={handleoOtionTexts}
            className='poll-add__body-form-input'
          />

          <input
            type='submit'
            value='Submit'
            disabled={!optionTexts.optionOneText || !optionTexts.optionTwoText}
            className='btn poll__button'
          />
        </form>
      </div>
    </div>
  );
};

AddPoll.propTypes = {
  dispatchSaveNewQuestion: PropTypes.func.isRequired,
  authedUser: PropTypes.string.isRequired,
};
