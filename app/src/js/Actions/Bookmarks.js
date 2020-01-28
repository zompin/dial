import { batch } from 'react-redux';
import { ACTIONS } from '../constants';
import { getAppFolder } from '../utils';
import { profilesRequestAction, profilesRequestSuccessAction, profilesRequestErrorAction } from './Profiles';

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
    batch(() => {
      dispatch(bookmarksRequestAction());
      dispatch(profilesRequestAction());
    });

    try {
      const appFolder = await getAppFolder();
      const tree = (await browser.bookmarks.getSubTree(appFolder.id))
        .reduce((acc, item) => {
          item.children.forEach((p) => {
            if (!p.url) {
              acc.profiles.push({
                id: p.id,
                parentId: p.parentId,
                title: p.title,
              });
            }

            p.children.forEach((b) => {
              if (b.url) {
                acc.bookmarks.push({
                  id: b.id,
                  parentId: b.parentId,
                  title: b.title,
                  url: b.url,
                });
              }
            });
          });

          return acc;
        }, { profiles: [], bookmarks: [] });

      batch(() => {
        dispatch(profilesRequestSuccessAction(tree.profiles));
        dispatch(bookmarksRequestSuccessAction(tree.bookmarks));
      });
    } catch (e) {
      dispatch(profilesRequestErrorAction(e));
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
