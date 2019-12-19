import constents from '../constents/action.type';
import {setCookie} from '../utils/common.func';

export const setLoginData = (loginData) => {
    // setCookie(JSON.stringify({username, password}));
    return {
        type: constents.LOGIN,
        payload: loginData,
    }
};

export const logout = () => {
    return {
        type: constents.LOGOUT,
        payload: null,
    }
};