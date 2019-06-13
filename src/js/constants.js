import keyMirror from 'keymirror';

const isDevelopment = process.env.NODE_ENV === 'development';

export const ACTIONS = keyMirror({
  POPUP_DISABLE_CLOSE: undefined,
  POPUP_ENABLE_CLOSE: undefined,
  POPUP_SHOW: undefined,
  POPUP_HIDE: undefined,
  BOOKMARKS_TOGGLE: undefined,
  BOOKMARKS_REQUEST: undefined,
  BOOKMARKS_REQUEST_SUCCESS: undefined,
  BOOKMARKS_REQUEST_ERROR: undefined,
  BOOKMARK_ADD_REQUEST: undefined,
  BOOKMARK_ADD_SUCCESS: undefined,
  BOOKMARK_ADD_ERROR: undefined,
  BOOKMARK_REMOVE_REQUEST: undefined,
  BOOKMARK_REMOVE_SUCCESS: undefined,
  BOOKMARK_REMOVE_ERROR: undefined,
  BOOKMARK_REQUEST_GET: undefined,
  BOOKMARK_REQUEST_SUCCESS: undefined,
  BOOKMARK_REQUEST_ERROR: undefined,
  BOOKMARK_UPDATE_REQUEST: undefined,
  BOOKMARK_UPDATE_SUCCESS: undefined,
  BOOKMARK_UPDATE_ERROR: undefined,
  BOOKMARK_CLEAN: undefined,
  HISTORY_REQUEST_GET: undefined,
  HISTORY_REQUEST_SUCCESS: undefined,
  HISTORY_REQUEST_ERROR: undefined,
  STORAGE_GET: undefined,
  STORAGE_GET_SUCCESS: undefined,
  STORAGE_GET_ERROR: undefined,
  STORAGE_UPDATE: undefined,
  STORAGE_UPDATE_SUCCESS: undefined,
  STORAGE_UPDATE_ERROR: undefined,
});

export const NAMES = {
  ROOT_FOLDER: 'unfiled_____',
  APP_FOLDER: isDevelopment ? 'Dial_dev' : 'Dial',
  PROFILES_DEFAULT: 'Default',
};

export const TYPES = {
  FOLDER: 'folder',
  BOOKMARK: 'bookmark',
};
