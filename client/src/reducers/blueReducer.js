import { UPDATE_BLUE } from "../actions/types";

export default function selectionReducer(
  state = { value: 70, label: "Jaylen Brown" },
  action
) {
  switch (action.type) {
    case UPDATE_BLUE:
      return action.payload;
    default:
      return state;
  }
}
