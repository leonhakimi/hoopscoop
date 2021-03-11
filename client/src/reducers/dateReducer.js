import { UPDATE_DATE } from "../actions/types";
import { startOfWeek, endOfWeek } from "date-fns";

const today = new Date();

const start = new Date(startOfWeek(today))

const end = new Date(endOfWeek(today))

function dateReducer(state = [start, end], action) {
  switch (action.type) {
    case UPDATE_DATE:
      return action.payload;
    default:
      return state;
  }
}

export default dateReducer;