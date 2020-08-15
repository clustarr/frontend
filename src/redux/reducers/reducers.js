import {combineReducers} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {hostsReducer} from "./hosts-reducer";

export default combineReducers({
    tasksReducer,
    hostsReducer
});
