import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { bookmarks, IBookmarks } from './bookmarks';
import { profiles, IProfiles } from './profiles';
import { favicons, IFavicons } from './favicons';

export interface IStore {
  bookmarks: IBookmarks
  profiles: IProfiles
  favicons: IFavicons
}

const reducers = combineReducers<IStore>({
  bookmarks,
  profiles,
  favicons,
});

export const store = createStore(reducers, {}, applyMiddleware(thunk));
