import constents from '../constents/action.type';
import {setCookie} from '../utils/common.func';

export const setLoginData = (username, password) => {
    setCookie(JSON.stringify({username, password}));
    return {
        type: constents.LOGIN,
        payload: {username, password},
    }
};

export const logout = () => {
    return {
        type: constents.LOGOUT,
        payload: null,
    }
};