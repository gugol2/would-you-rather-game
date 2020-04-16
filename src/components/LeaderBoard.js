import React from 'react';
import '../styles/LeaderBoard.scss';
import { connect } from 'react-redux';
import { AvatarImage } from './AvatarImage';

const LeaderBoard = ({usersOrderedByScore}) => {
    return (
        <div className='leader-board'>
            {usersOrderedByScore.map(user => (
                <div className="leader-board-item" key={user.id}>
                    <div className="leader-board-item__left">
                            <AvatarImage user={user} modifier='medium' />
                    </div>

                    <div className="leader-board-item__middle">
                        <div className="leader-board-item__user">{user.name}</div>

                        <div className="leader-board-item__answered">
                            <div>Answered Questions</div>
                            <div>{Object.keys(user.answers).length}</div>
                        </div>

                        <div className="leader-board-item__created">
                            <div>Created Questions</div>
                            <div>{user.questions.length}</div>
                        </div>
                    </div>

                    <div className="leader-board-item__right">
                        <div className='leader-board-item__right-title'>Score</div>
                        <div className="leader-board-item__right-score">
                            {Object.keys(user.answers).length + user.questions.length}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}

const mapStateToProps = ({users}) => {
    const usersOrderedByScore = Object.values(users).sort((a, b) => {
        return ((Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length));
    });

    return {
        usersOrderedByScore
    }
}

export const ConnectedLeaderBoard = connect(mapStateToProps)(LeaderBoard);