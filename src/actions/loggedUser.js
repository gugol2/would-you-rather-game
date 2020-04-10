export const SET_LOGGED_USER = 'SET_LOGGED_USER';

export const setLoggedUser = (id) => {
    return {
        type: SET_LOGGED_USER,
        id
    }
};