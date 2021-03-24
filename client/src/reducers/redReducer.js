import { UPDATE_RED } from "../actions/types";

export default function selectionReducer(state = {value: 434, label: 'Jayson Tatum'}, action) {
  switch (action.type) {
    case UPDATE_RED:
      return action.payload;
    default:
      return state;
  }
}
