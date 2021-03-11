import { FETCH_USER, SAVE_TEAM } from "../actions/types";

function authReducer(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case SAVE_TEAM:
      return state;
    default:
      return state;
  }
}

export default authReducer;