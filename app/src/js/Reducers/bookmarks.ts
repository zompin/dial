import { createReducer } from 'redux-act';
import {
  bookmarksRequest, bookmarksRequestSuccess, bookmarksRequestError, bookmarkAdd, bookmarkUpdate, bookmarkRemove,
  bookmarkSetParentId, bookmarkSetEditId, bookmarkSetDeleteId,
} from '../Actions/bookmarks';

export interface IBookmarks {
  data: IBookmark[]
  isLoaded: boolean
  error: any
  bookmarkEditId: string
  bookmarkDeleteId: string
  bookmarkParentId: string
}

const initState: IBookmarks = {
  data: [],
  isLoaded: false,
  bookmarkEditId: '',
  bookmarkDeleteId: '',
  bookmarkParentId: '',
  error: null,
};

export const bookmarks = createReducer<IBookmarks>({}, initState)
  .on(bookmarksRequest, (state) => ({
    ...state,
  }))
  .on(bookmarksRequestSuccess, (state, data) => ({
    ...state,
    isLoaded: true,
    data,
  }))
  .on(bookmarksRequestError, (state, error) => ({
    ...state,
    error,
  }))
  .on(bookmarkAdd, (state, bookmark) => ({
    ...state,
    data: [...state.data, bookmark],
  }))
  .on(bookmarkUpdate, (state, { id, title, url }) => ({
    ...state,
    data: state.data.map((d) => {
      if (d.id === id) {
        return {
          ...d,
          title,
          url,
        };
      }

      return d;
    }),
  }))
  .on(bookmarkRemove, (state, id) => ({
    ...state,
    data: state.data.filter((d) => d.id !== id),
  }))
  .on(bookmarkSetParentId, (state, bookmarkParentId) => ({
    ...state,
    bookmarkParentId,
  }))
  .on(bookmarkSetEditId, (state, bookmarkEditId) => ({
    ...state,
    bookmarkEditId,
  }))
  .on(bookmarkSetDeleteId, (state, bookmarkDeleteId) => ({
    ...state,
    bookmarkDeleteId,
  }));
