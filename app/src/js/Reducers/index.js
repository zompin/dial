import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Bookmarks from './Bookmarks';
import Storage from './Storage';
import Profiles from './Profiles';

const reducers = combineReducers({
  Bookmarks,
  Storage,
  Profiles,
});

export default createStore(reducers, {}, applyMiddleware(thunk));
