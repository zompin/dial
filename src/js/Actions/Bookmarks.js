import { ACTIONS, TYPES } from '../constants';
import { bookmarks as browserBookmarks } from '../utils';
import { getProfilesAction } from "./Profiles";

export const toggleBookmarksAction = () => ({
  type: ACTIONS.BOOKMARKS_TOGGLE,
});

const bookmarksRequestAction = () => ({
  type: ACTIONS.BOOKMARKS_REQUEST,
});

const bookmarksRequestSuccessAction = (bookmarks, bookmarksFolder) => ({
  type: ACTIONS.BOOKMARKS_REQUEST_SUCCESS,
  bookmarks,
  bookmarksFolder,
});

const bookmarksRequestErrorAction = error => ({
  type: ACTIONS.BOOKMARKS_REQUEST_ERROR,
  error,
});

export const getBookmarksAction = () => (
  async (dispatch) => {
    const profiles = await dispatch(getProfilesAction());
    dispatch(bookmarksRequestAction());

    try {
      let bookmarks = await Promise.all(profiles.reduce((acc, item) => {
        acc.push(browserBookmarks.getChildren(item.id));

        return acc;
      }, []));

      bookmarks = bookmarks.map((g, i) => ({
        parentId: profiles[i].id,
        items: g,
      }));
      // console.log(bookmarks)

      dispatch(bookmarksRequestSuccessAction(bookmarks));
    } catch (e) {
      dispatch(bookmarksRequestErrorAction(e));
    }
  }
);

const bookmarkAddAction = () => ({
  type: ACTIONS.BOOKMARK_ADD,
});

const bookmarkAddSuccessAction = bookmark => ({
  type: ACTIONS.BOOKMARK_ADD_SUCCESS,
  bookmark,
});

const bookmarkAddError = error => ({
  type: ACTIONS.BOOKMARK_ADD_ERROR,
  error,
});

export const addBookmarkAction = (url, title, parentId) => (
  async (dispatch) => {
    dispatch(bookmarkAddAction());

    try {
      const bookmark = await browserBookmarks.create({
        type: TYPES.BOOKMARK,
        parentId,
        title,
        url,
      });

      dispatch(bookmarkAddSuccessAction(bookmark));
    } catch (e) {
      dispatch(bookmarkAddError(e));
    }
  }
);

const bookmarkRemoveAction = () => ({
  type: ACTIONS.BOOKMARK_REMOVE,
});

const bookmarkRemoveSuccessAction = id => ({
  type: ACTIONS.BOOKMARK_REMOVE_SUCCESS,
  id,
});

const bookmarkRemoveErrorAction = error => ({
  type: ACTIONS.BOOKMARK_REMOVE_ERROR,
  error,
});

export const removeBookmarkAction = bookmarkId => (
  async (dispatch) => {
    dispatch(bookmarkRemoveAction());

    try {
      await browserBookmarks.remove(bookmarkId);
      dispatch(bookmarkRemoveSuccessAction(bookmarkId));
    } catch (e) {
      dispatch(bookmarkRemoveErrorAction());
    }
  }
);

const bookmarkUpdateAction = () => ({
  type: ACTIONS.BOOKMARK_UPDATE,
});

const bookmarkUpdateSuccessAction = bookmark => ({
  type: ACTIONS.BOOKMARK_UPDATE_SUCCESS,
  bookmark,
});

const bookmarkUpdateErrorAction = error => ({
  type: ACTIONS.BOOKMARK_UPDATE_ERROR,
  error,
});

export const updateBookmarkAction = (id, url, title) => (
  async (dispatch) => {
    dispatch(bookmarkUpdateAction());

    try {
      const bookmark = await browserBookmarks.update(id, {
        url,
        title,
      });

      dispatch(bookmarkUpdateSuccessAction(bookmark));
    } catch (e) {
      dispatch(bookmarkUpdateErrorAction(e));
    }
  }
);
