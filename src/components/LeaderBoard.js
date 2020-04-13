import React from 'react';
// import { AvatarImage } from './AvatarImage';

export const LeaderBoard = (props) => {
    return (
        <div className='leader-board'>
            <div className="leader-board'__left">
                    {/* <AvatarImage user={}/> */}
            </div>
            <div className="leader-board__center">
                <h4>User name</h4>

                <div className="leader-board__answered">
                    Answered Questions
                </div>

                <div className="leader-board__created">
                    Created Questions
                </div>
            </div>

            <div className="leader-board__right">
                <div className='leader-board__right-title'>Score</div>
                <div className="leader-board__right-score">
                    10
                </div>
            </div>
            
        </div>
    )
}

