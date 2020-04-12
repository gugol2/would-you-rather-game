import React from 'react';
import { connect } from 'react-redux';
import { PollHeader } from './PollHeader';
import { AvatarImage } from './AvatarImage';
import { PollResultOption } from './PollResultOption';

const PollResults = (props) => {
    const { 
        question, 
        pollAuthor, 
        votesOptionOne,
        votesOptionTwo,
        totalVotes,
        percentageOptionOne,
        percentageOptionTwo,
        authedUser
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
                    <div className="poll-results__right-title">
                        Results:
                    </div>
                    <PollResultOption 
                        option={optionOne}
                        percentageOption={percentageOptionOne}
                        votesOption={votesOptionOne}
                        totalVotes={totalVotes}
                        authedUser={authedUser}
                    />

                    <PollResultOption 
                        option={optionTwo}
                        percentageOption={percentageOptionTwo}
                        votesOption={votesOptionTwo}
                        totalVotes={totalVotes}
                        authedUser={authedUser}
                    />
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
    
    return {
        question,
        authedUser,
        pollAuthor: users[question.author] || {},
        votesOptionOne,
        votesOptionTwo,
        totalVotes,
        percentageOptionOne,
        percentageOptionTwo
    }
}

export const ConnectedPollResults = connect(mapStateToProps)(PollResults);