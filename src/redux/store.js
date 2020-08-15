import {applyMiddleware, createStore} from "redux";
import combinedReducers from "./reducers/reducers";
import thunk from "redux-thunk";

const store = createStore(
    combinedReducers,
    applyMiddleware(thunk)
);
export default store;
