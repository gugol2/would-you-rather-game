import React from 'react';
import { connect } from 'react-redux';
import { AvatarImage } from './AvatarImage';

const LeaderBoard = (props) => {
    const { users } = props;
    
    const userList = Object.values(users);

    return (
        <div className='leader-board'>
            {userList.map(user => (
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
    return {
        users
    }
}

export const ConnectedLeaderBoard = connect(mapStateToProps)(LeaderBoard);