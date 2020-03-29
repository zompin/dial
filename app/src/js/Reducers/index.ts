import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { bookmarks, IBookmarks } from './bookmarks';
import { profiles, IProfiles } from './profiles';

export interface IStore {
  bookmarks: IBookmarks
  profiles: IProfiles
}

const reducers = combineReducers<IStore>({
  bookmarks,
  profiles,
});

export const store = createStore(reducers, {}, applyMiddleware(thunk));
