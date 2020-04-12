import React from 'react';

export const PollResultOption = ({option, percentageOption, votesOption, totalVotes}) => {

    return (
        <div className="poll-results__option">
            <div className="poll-results__option-text">
                {option && option.text}
            </div>
            <div className="poll-results__option-percent">
                {percentageOption}
            </div>
            <div className="poll-results__option-number">
                {`${votesOption} out of ${totalVotes}`}
            </div>
        </div>
    )
}