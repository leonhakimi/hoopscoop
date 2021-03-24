import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dateReducer from './dateReducer';
import statsReducer from "./statsReducer";
import defaultReducer from "./defaultReducer";
//import selectionReducer from './selectionReducer';
import averagesReducer from './averagesReducer';
import categoryReducer from './categoryReducer';
import  redReducer from './redReducer';
import blueReducer from './blueReducer';
import comparisonReducer from './comparisonReducer';

export default combineReducers({
  auth: authReducer,
  dateSelection: dateReducer,
  stats: statsReducer,
  defaultPlayers: defaultReducer,
  //selection: selectionReducer,
  playerRed: redReducer,
  playerBlue: blueReducer,
  averages: averagesReducer,
  category: categoryReducer,
  comparison: comparisonReducer
});
