import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Popup from './Popup';
import Bookmarks from './Bookmarks';
import History from './History';
import Storage from './Storage';
import Profiles from './Profiles';

const reducers = combineReducers({
  Popup,
  Bookmarks,
  History,
  Storage,
  Profiles,
});

export default createStore(reducers, {}, applyMiddleware(thunk));
