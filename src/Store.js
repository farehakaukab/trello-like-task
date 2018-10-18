import { createStore, applyMiddleware } from "redux";
import { default as ReduxThunk } from "redux-thunk";
import reducer from "./Reducers/Reducer";
import logger from "redux-logger";

const middleware = applyMiddleware(ReduxThunk, logger);

export default createStore(reducer, middleware);
