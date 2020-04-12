import { RECEIVE_USERS } from "../actions/users";
import { SAVE_ANSWER_TO_QUESTION } from "../actions/questions";

export const users = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            
            return {
                ...state,
                ...action.users
            };
        
        case SAVE_ANSWER_TO_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }


            }
    
        default:
            return state;
    }
}