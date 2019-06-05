import {
  BOOKMARKS_TOGGLE,
  BOOKMARKS_REQUEST_GET,
  BOOKMARKS_REQUEST_SUCCESS,
  BOOKMARK_ADD_REQUEST,
  BOOKMARK_ADD_SUCCESS,
  BOOKMARK_REMOVE_REQUEST,
  BOOKMARK_REQUEST_SUCCESS,
  BOOKMARK_CLEAN,
} from '../ActionTypes';

export const toggleBookmarks = () => ({
  type: BOOKMARKS_TOGGLE,
});

export const requestBookmarks = () => ({
  type: BOOKMARKS_REQUEST_GET,
});

export const setBookmarks = (bookmarks, bookmarksFolder) => ({
  type: BOOKMARKS_REQUEST_SUCCESS,
  bookmarks,
  bookmarksFolder,
});

const getRootFolder = async () => {
  const rootBookmarks = await browser.bookmarks.getChildren('unfiled_____');
  let dialFolder = rootBookmarks.find(b => b.title === 'Dial' && b.type === 'folder');

  if (!dialFolder) {
    dialFolder = await browser.bookmarks.create({
      title: 'Dial',
      parentId: 'unfiled_____',
    });
  }

  return dialFolder;
};

const getProfiles = async (rootFolder) => {
  let children = await browser.bookmarks.getChildren(rootFolder.id);
  children = children.filter(c => c.type === 'folder');

  if (!children.length) {
    const tmp = await browser.bookmarks.create({
      title: 'Default',
      parentId: rootFolder.id,
    });

    children.push(tmp);
  }

  return children;
};

export const getBookmarks = () => (
  async (dispatch) => {
    const rootBookmarks = await browser.bookmarks.getChildren('unfiled_____');
    let dialFolder = rootBookmarks.find(b => b.title === 'Dial' && b.type === 'folder');

    if (!dialFolder) {
      dialFolder = await browser.bookmarks.create({
        title: 'Dial',
        parentId: 'unfiled_____',
      });
    }

    const bookmarks = await browser.bookmarks.getChildren(dialFolder.id);
    dispatch(setBookmarks(bookmarks, dialFolder));
  }
);

export const requestAddBookmark = () => ({
  type: BOOKMARK_ADD_REQUEST,
});

export const addBookmarkSuccess = () => ({
  type: BOOKMARK_ADD_SUCCESS,
});

export const addBookmark = (url, title, parentId) => (
  (dispatch) => {
    browser.bookmarks.create({
      type: 'bookmark',
      parentId,
      title,
      url,
    }).then(() => {
      dispatch(addBookmarkSuccess());
      dispatch(getBookmarks());
    });
  }
);

export const requestRemoveBookmark = () => ({
  type: BOOKMARK_REMOVE_REQUEST,
});

export const removeBookmark = bookmarkId => (
  (dispatch) => {
    dispatch(requestRemoveBookmark());
    browser.bookmarks.remove(bookmarkId)
      .then(() => {
        dispatch(getBookmarks());
      });
  }
);

export const setBookmark = bookmark => ({
  type: BOOKMARK_REQUEST_SUCCESS,
  bookmark,
});

export const getBookmark = bookmarkId => (
  dispatch => browser.bookmarks.get(bookmarkId)
    .then(bookmark => dispatch(setBookmark(bookmark[0])))
);

export const updateBookmark = (id, url, title) => (
  dispatch => browser.bookmarks.update(id, {
    url,
    title,
  })
    .then(() => dispatch(getBookmarks()))
);

export const cleanBookmark = () => ({
  type: BOOKMARK_CLEAN,
});
