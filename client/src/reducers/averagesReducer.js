import { UPDATE_AVERAGES } from "../actions/types";

export default function averagesReducer(state = null, action) {
  switch (action.type) {
    case UPDATE_AVERAGES:
      return action.payload;
    default:
      return state;
  }
}
