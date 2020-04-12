import React, { useState } from 'react';

export const AddPoll = (props) => {
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
        event.preventDefault();

        // todo: add poll to the DB
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

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="optionOneText"
                        id="optionOneText"
                        placeholder='Enter Option One Text Here'
                        value={optionTexts.optionOneText}
                        onChange={handleoOtionTexts}
                    />
                    <input
                        type="text"
                        name="optionTwoText"
                        id="optionTwoText"
                        placeholder='Enter Option Two Text Here'
                        value={optionTexts.optionTwoText}
                        onChange={handleoOtionTexts}
                    />

                    <input 
                        type="button" 
                        value="Submit"
                        disabled={!optionTexts.optionOneText || !optionTexts.optionTwoText}
                    />
                </form>
            </div>
        </div>
    )
}