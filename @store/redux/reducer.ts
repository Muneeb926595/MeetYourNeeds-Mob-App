import { combineReducers } from "redux";

import auth from "../auth/AuthReducers";

const MeedYourNeeds = combineReducers({
  auth,
});

export default MeedYourNeeds;
