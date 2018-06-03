import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Popup from './Popup';
import Bookmarks from './Bookmarks';
import History from './History';

const reducers = combineReducers({
  Popup,
  Bookmarks,
  History,
});

export default createStore(reducers, {}, applyMiddleware(thunk));