import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dateReducer from './dateReducer';
import statsReducer from "./statsReducer";
import defaultReducer from "./defaultReducer";
import selectionReducer from './selectionReducer';
import averagesReducer from './averagesReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  auth: authReducer,
  dateSelection: dateReducer,
  stats: statsReducer,
  defaultPlayers: defaultReducer,
  selection: selectionReducer,
  averages: averagesReducer,
  category: categoryReducer
});
