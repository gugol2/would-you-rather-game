import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleSaveNewQuestion } from '../actions/questions';

const AddPoll = (props) => {
    const [optionTexts, setOptionTexts] = useState({
        optionOneText: '',
        optionTwoText: ''
    });

    const handleoOtionTexts = ({target}) => {
        const { name, value } = target;

        setOptionTexts({
            ...optionTexts,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        debugger;
        event.preventDefault();

        const { dispatch, authedUser } = props;
        const { optionOneText, optionTwoText } = optionTexts;
        debugger;
        dispatch(handleSaveNewQuestion({ optionOneText, optionTwoText, author:authedUser }))
            .then(() => {
                setOptionTexts({
                    optionOneText: '',
                    optionTwoText: ''
                });
            })
    }

    return (
        <div className="poll-add">
            <div className="poll-add__header">
                Create New Question
            </div>

            <div className="poll-add__body">
                <div className="poll-add__body-instructions">
                    Complete the question:
                </div>
                <div className="poll-add__body-title">
                    Would you rather...
                </div>

                <form 
                    onSubmit={handleSubmit}
                    className='poll-add__body-form'
                >
                    <input
                        type="text"
                        name="optionOneText"
                        id="optionOneText"
                        placeholder='Enter Option One Text Here'
                        value={optionTexts.optionOneText}
                        onChange={handleoOtionTexts}
                        className='poll-add__body-form-input'
                    />

                    <div className='poll-add__body-form-or'>OR</div>

                    <input
                        type="text"
                        name="optionTwoText"
                        id="optionTwoText"
                        placeholder='Enter Option Two Text Here'
                        value={optionTexts.optionTwoText}
                        onChange={handleoOtionTexts}
                        className='poll-add__body-form-input'
                    />

                    <input 
                        type="submit" 
                        value="Submit"
                        disabled={!optionTexts.optionOneText || !optionTexts.optionTwoText}
                        className='poll-add__body-form-button'
                    />
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = ({authedUser}) => {
    return {
        authedUser
    }
};

export const ConnectedAddPoll = connect(mapStateToProps)(AddPoll);