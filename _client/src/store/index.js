import { combineReducers } from "redux";
import appStore from "./app.store";
import dataStore from "./datas.store";
import settingsStore from "./settings.store";
import userStore from "./user.store";
export default combineReducers({appStore,dataStore,settingsStore,userStore});