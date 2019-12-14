import constents from '../constents/action.type';

export const setSettings = (settings) => {
    return {
        type: constents.SET_SETTINGS,
        payload: settings,
    }
};