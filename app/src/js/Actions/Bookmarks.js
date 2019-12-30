import { ACTIONS } from '../constants';
import { getAppFolder } from '../utils';

const bookmarksRequestAction = () => ({
  type: ACTIONS.BOOKMARKS_REQUEST,
});

const bookmarksRequestSuccessAction = (data) => ({
  type: ACTIONS.BOOKMARKS_REQUEST_SUCCESS,
  data,
});

const bookmarksRequestErrorAction = (error) => ({
  type: ACTIONS.BOOKMARKS_REQUEST_ERROR,
  error,
});

export const getBookmarks = () => (
  async (dispatch) => {
    dispatch(bookmarksRequestAction());

    try {
      const appFolder = await getAppFolder();
      const folders = await browser.bookmarks.getChildren(appFolder.id);
      const promises = folders.filter((f) => !f.url)
        .map((f) => browser.bookmarks.getChildren(f.id));
      const bookmarks = await Promise.all(promises);

      dispatch(bookmarksRequestSuccessAction(bookmarks.flat().filter((b) => !!b.url)));
    } catch (e) {
      dispatch(bookmarksRequestErrorAction(e));
    }
  }
);

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
