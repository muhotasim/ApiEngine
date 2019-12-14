import constents from '../constents/action.type';

const initialState = {
    apiKey: null,
    appUrl: '',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case constents.SET_SETTINGS:
            return Object.assign({}, state, action.payload);
            break;
        default:
            return state;
    }
}