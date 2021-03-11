import { UPDATE_CATEGORY } from "../actions/types";

export default function categoryReducer(state = "fp", action) {
  switch (action.type) {
    case UPDATE_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}
