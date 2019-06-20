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
  BOOKMARK_ADD: undefined,
  BOOKMARK_ADD_SUCCESS: undefined,
  BOOKMARK_ADD_ERROR: undefined,
  BOOKMARK_REMOVE: undefined,
  BOOKMARK_REMOVE_SUCCESS: undefined,
  BOOKMARK_REMOVE_ERROR: undefined,
  BOOKMARK_REQUEST: undefined,
  BOOKMARK_REQUEST_SUCCESS: undefined,
  BOOKMARK_REQUEST_ERROR: undefined,
  BOOKMARK_UPDATE: undefined,
  BOOKMARK_UPDATE_SUCCESS: undefined,
  BOOKMARK_UPDATE_ERROR: undefined,
  BOOKMARK_CLEAN: undefined,
  PROFILES_REQUEST: undefined,
  PROFILES_REQUEST_SUCCESS: undefined,
  PROFILES_REQUEST_ERROR: undefined,
  PROFILE_ADD: undefined,
  PROFILE_ADD_SUCCESS: undefined,
  PROFILE_ADD_ERROR: undefined,
  PROFILE_UPDATE: undefined,
  PROFILE_UPDATE_SUCCESS: undefined,
  PROFILE_UPDATE_ERROR: undefined,
  PROFILE_REMOVE: undefined,
  PROFILE_REMOVE_SUCCESS: undefined,
  PROFILE_REMOVE_ERROR: undefined,
  HISTORY_REQUEST: undefined,
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
