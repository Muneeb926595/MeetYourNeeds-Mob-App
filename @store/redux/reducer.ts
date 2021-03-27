import { combineReducers } from "redux";

import auth from "../auth/AuthReducers";
import product from "../product/ProductReducers";

const MeedYourNeeds = combineReducers({
  auth,
  product,
});

export default MeedYourNeeds;
