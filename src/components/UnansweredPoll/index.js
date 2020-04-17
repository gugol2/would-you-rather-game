// import '../styles/Poll.scss';
import { UnansweredPoll } from './UnansweredPoll';
import { connect } from 'react-redux';

const mapStateToProps = ({questions, authedUser, users}, {qid}) => {
    const question = questions[qid] || {};

    return {
        question,
        authedUser,
        pollAuthor: users[question.author] || {}
    }
}

export const ConnectedUnansweredPoll = connect(mapStateToProps)(UnansweredPoll);