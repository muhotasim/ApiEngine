import ServerApi from "../utils/ServerApi";
import appConst from "../constents/appConstents";
import actionType from "../constents/action.type";

export const login = (data) =>{
    return {
        type:actionType.logIn,
        payload:data
    };
}

export const loginAsync = (username, password) => {
    const serverApi = new ServerApi(appConst.authUrl);
    return (dispatch) => {
        serverApi.login(username, password,returnData=>{
            if(returnData.access_token){
               dispatch(login(Object.assign({},returnData,{login:false})));
            }
        });
    };
}

