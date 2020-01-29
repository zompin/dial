import { ACTIONS } from '../constants';

export const bookmarksRequestAction = () => ({
  type: ACTIONS.BOOKMARKS_REQUEST,
});

export const bookmarksRequestSuccessAction = (data) => ({
  type: ACTIONS.BOOKMARKS_REQUEST_SUCCESS,
  data,
});

export const bookmarksRequestErrorAction = (error) => ({
  type: ACTIONS.BOOKMARKS_REQUEST_ERROR,
  error,
});

export const addBookmark = (bookmark) => ({
  type: ACTIONS.BOOKMARK_ADD,
  bookmark,
});

export const updateBookmark = (id, title, url) => ({
  type: ACTIONS.BOOKMARK_UPDATE,
  id,
  title,
  url,
});

export const removeBookmark = (id) => ({
  type: ACTIONS.BOOKMARK_REMOVE,
  id,
});

export const setBookmarkEditId = (bookmarkEditId) => ({
  type: ACTIONS.BOOKMARK_SET_EDIT_ID,
  bookmarkEditId,
});

export const setBookmarkDeleteId = (bookmarkDeleteId) => ({
  type: ACTIONS.BOOKMARK_SET_DELETE_ID,
  bookmarkDeleteId,
});

export const setBookmarkParentId = (bookmarkParentId) => ({
  type: ACTIONS.BOOKMARK_SET_PARENT_ID,
  bookmarkParentId,
});
