import actionType from "../constents/action.type";
const initialState = {
    refresh_token: '',
    access_token: '',
    expires_in: '',
    token_type:'',
    login:true,
};
const appStore = (state = initialState, action = {}) => {
    switch(action.type){
        case actionType.logIn:
            debugger
            return Object.assign({},state,action.payload); 
            
            break;
        default:
            return state;
    }
}

export default appStore;