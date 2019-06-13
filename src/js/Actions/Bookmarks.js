import { ACTIONS, TYPES, NAMES } from '../constants';

export const toggleBookmarks = () => ({
  type: ACTIONS.BOOKMARKS_TOGGLE,
});

export const requestBookmarks = () => ({
  type: ACTIONS.BOOKMARKS_REQUEST,
});

export const setBookmarks = (bookmarks, bookmarksFolder) => ({
  type: ACTIONS.BOOKMARKS_REQUEST_SUCCESS,
  bookmarks,
  bookmarksFolder,
});

const getRootFolder = async () => {
  const rootBookmarks = await browser.bookmarks.getChildren(NAMES.ROOT_FOLDER);
  let dialFolder = rootBookmarks.find(b => b.title === NAMES.APP_FOLDER && b.type === TYPES.FOLDER);

  if (!dialFolder) {
    dialFolder = await browser.bookmarks.create({
      title: NAMES.APP_FOLDER,
      parentId: NAMES.ROOT_FOLDER,
    });
  }

  return dialFolder;
};

const getProfiles = async (rootFolder) => {
  let children = await browser.bookmarks.getChildren(rootFolder.id);
  children = children.filter(c => c.type === TYPES.FOLDER);

  if (!children.length) {
    const tmp = await browser.bookmarks.create({
      title: NAMES.PROFILES_DEFAULT,
      parentId: rootFolder.id,
    });

    children.push(tmp);
  }

  return children;
};

export const getBookmarks = () => (
  async (dispatch) => {
    const rootBookmarks = await browser.bookmarks.getChildren(NAMES.ROOT_FOLDER);
    let dialFolder = rootBookmarks.find(b => b.title === NAMES.APP_FOLDER && b.type === TYPES.FOLDER);

    if (!dialFolder) {
      dialFolder = await browser.bookmarks.create({
        title: NAMES.APP_FOLDER,
        parentId: NAMES.ROOT_FOLDER,
      });
    }

    const bookmarks = await browser.bookmarks.getChildren(dialFolder.id);
    dispatch(setBookmarks(bookmarks, dialFolder));
  }
);

export const requestAddBookmark = () => ({
  type: ACTIONS.BOOKMARK_ADD_REQUEST,
});

export const addBookmarkSuccess = () => ({
  type: ACTIONS.BOOKMARK_ADD_SUCCESS,
});

export const addBookmark = (url, title, parentId) => (
  (dispatch) => {
    browser.bookmarks.create({
      type: TYPES.BOOKMARK,
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
  type: ACTIONS.BOOKMARK_REMOVE_REQUEST,
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
  type: ACTIONS.BOOKMARK_REQUEST_SUCCESS,
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
  type: ACTIONS.BOOKMARK_CLEAN,
});
