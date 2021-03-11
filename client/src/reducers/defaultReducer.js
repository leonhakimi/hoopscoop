import { UPDATE_DEFAULT } from "../actions/types";

function defaultReducer(state = null, action) {
  switch (action.type) {
    case UPDATE_DEFAULT:
      return action.payload;
    default:
      return state;
  }
}

export default defaultReducer;