import React from 'react';
import { ConnectedPoll } from './Poll';
import { ConnectedPollResults } from './PollResults';
import { useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PollDetails = ({authedUser}) => {
    let location = useLocation();
    const { state } = location;

    if(state) {
        const { qid, unAnswered } = state;

        if(authedUser) {
            return (
                <div>
                    {unAnswered ? 
                        <ConnectedPoll qid={qid} /> 
                        : 
                        <ConnectedPollResults qid={qid} />}
                </div>
            )
        } else {
            return null;
        }
    } else {
        return (
            <Redirect
                to={{
                    pathname: "/404",
                }}
            />
        )
    }

}

const mapStateToProps = ({authedUser}) => {
    return {
        authedUser
    }
}

export const ConnectedPollDetails = connect(mapStateToProps)(PollDetails);