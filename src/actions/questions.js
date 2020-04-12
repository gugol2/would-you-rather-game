import { saveQuestionAnswer, saveQuestion } from "../utils/api";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER_TO_QUESTION = 'SAVE_ANSWER_TO_QUESTION';
export const REMOVE_ANSWER_TO_QUESTION = 'REMOVE_ANSWER_TO_QUESTION';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
};

const saveAnswerToQuestion = ({ authedUser, qid, answer }) => {
    return {
        type: SAVE_ANSWER_TO_QUESTION,
        qid,
        answer,
        authedUser
    }
};

const removeAnswerToQuestion = ({ authedUser, qid, answer }) => {
    return {
        type: REMOVE_ANSWER_TO_QUESTION,
        qid,
        answer,
        authedUser
    }
};

export const handleSaveAnswerToQuestion = ({ authedUser, qid, answer }) => {
    return (dispatch, getState) => {
        const { users } = getState();
        const pollAlreadyVoted = users[authedUser].answers.hasOwnProperty(qid);

        if(!pollAlreadyVoted) {
            // Answer question optimistically
            dispatch(saveAnswerToQuestion({ authedUser, qid, answer }));

            saveQuestionAnswer({ authedUser, qid, answer }).catch(() => {
                dispatch(removeAnswerToQuestion({ authedUser, qid, answer }));
                alert('Your answer could not be save, please try again!!');
            });
        } else {
            alert('You alredy voted this poll my friend, try another poll!!');
        }
    }
};

const saveNewQuestion = (question) => {
    return {
        type: SAVE_QUESTION,
        question
    }
};

export const handleSaveNewQuestion = ({ optionOneText, optionTwoText, author }) => {
    return (dispatch) => {
        saveQuestion({ optionOneText, optionTwoText, author }).then(question => {
            dispatch(saveNewQuestion(question))
        })
    }
};

