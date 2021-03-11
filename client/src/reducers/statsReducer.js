import { UPDATE_STATS } from "../actions/types";

export default function statsReducer(state = null, action) {
  switch (action.type) {
    case UPDATE_STATS:
      return action.payload;
    default:
      return state;
  }
}

