import React from 'react';
import { connect } from 'react-redux';
import { PollHeader } from './PollHeader';
import { AvatarImage } from './AvatarImage';

const PollResults = (props) => {
    const { 
        question, 
        pollAuthor, 
        votesOptionOne,
        votesOptionTwo,
        totalVotes,
        percentageOptionOne,
        percentageOptionTwo,
    } = props;

    const { optionOne, optionTwo } = question;

    return (
        <div className='poll-results'>
            <PollHeader author={pollAuthor}/>

            <div className='poll-results__body'>
                <div className="poll-results__left">
                    <AvatarImage user={pollAuthor}/>
                </div>

                <div className="poll-results__right">
                    <div className="poll-results__option">
                        <div className="poll-results__option-text">
                            {optionOne && optionOne.text}
                        </div>
                        <div className="poll-results__option-percent">
                            {percentageOptionOne}
                        </div>
                        <div className="poll-results__option-number">
                            {`${votesOptionOne} out of ${totalVotes}`}
                        </div>
                    </div>

                    <div className="poll-results__option">
                        <div className="poll-results__option-text">
                            {optionTwo && optionTwo.text}
                        </div>
                        <div className="poll-results__option-percent">
                            {percentageOptionTwo}
                        </div>
                        <div className="poll-results__option-number">
                            {`${votesOptionTwo} out of ${totalVotes}`}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({questions, authedUser, users}, {qid}) => {
    const id = qid || 'loxhs1bqm25b708cmbf3g';
    const question = questions[id] || {};
    
    let votesOptionOne = 0;
    let votesOptionTwo = 0;
    let totalVotes = 0;
    let percentageOptionOne = 0;
    let percentageOptionTwo = 0;
    let authedUserOption = '';

    const calculatePercentage = (votesFromOption, votesTotal) => {
        const figure = (parseFloat(votesFromOption/votesTotal) *100).toPrecision(3);
        return `${figure}%`;
    }
    
    if(question.optionOne) {
        votesOptionOne = question.optionOne.votes.length;
        votesOptionTwo = question.optionTwo.votes.length;
        totalVotes = votesOptionOne + votesOptionTwo;
        percentageOptionOne = calculatePercentage(question.optionOne.votes.length, totalVotes);
        percentageOptionTwo = calculatePercentage(question.optionTwo.votes.length, totalVotes);
    }
    
    debugger;
    return {
        question,
        authedUser,
        authedUserOption,
        pollAuthor: users[question.author] || {},
        votesOptionOne,
        votesOptionTwo,
        totalVotes,
        percentageOptionOne,
        percentageOptionTwo
    }
}

export const ConnectedPollResults = connect(mapStateToProps)(PollResults);