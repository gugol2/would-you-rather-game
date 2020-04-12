import { saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER_TO_QUESTION = 'SAVE_ANSWER_TO_QUESTION';

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

export const handleSaveAnswerToQuestion = ({ authedUser, qid, answer }) => {
    return (dispatch) => {
        saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
            dispatch(saveAnswerToQuestion({ authedUser, qid, answer }));
        });
    }
};
