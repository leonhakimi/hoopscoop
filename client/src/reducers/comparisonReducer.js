import { UPDATE_COMPARISON } from "../actions/types";

export default function comparisonReducer(state = null, action) {
  switch (action.type) {
    case UPDATE_COMPARISON:
      return action.payload;
    default:
      return state;
  }
}
