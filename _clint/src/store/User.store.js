import constents from '../constents/action.type';

const initialState = {
    loginData: "",
    username: "",
    token:"",
    useremail:"",
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case constents.LOGIN:
            return Object.assign({}, state, {loginData: action.payload, username: action.payload.username});
            break;
        case constents.LOGOUT:
            return Object.assign({}, state, {loginData: null, username: null});
            break;
        default:
            return state;
    }
};