import { combineReducers } from "redux";

import MeedYourNeeds from "../redux/reducer";

const createReducer = (asyncReducers) =>
  combineReducers({
    MeedYourNeeds,
    ...asyncReducers,
  });

export default createReducer;
