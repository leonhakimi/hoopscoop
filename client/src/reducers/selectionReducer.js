import { UPDATE_SELECTION } from "../actions/types";

export default function selectionReducer(state = null, action) {
  switch (action.type) {
    case UPDATE_SELECTION:
      return action.payload;
    default:
      return state;
  }
}
