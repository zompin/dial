import keyMirror from 'keymirror';

const isDevelopment = process.env.NODE_ENV === 'development';

export const ACTIONS = keyMirror({
  BOOKMARKS_REQUEST: undefined,
  BOOKMARKS_REQUEST_SUCCESS: undefined,
  BOOKMARKS_REQUEST_ERROR: undefined,
  BOOKMARK_ADD: undefined,
  BOOKMARK_UPDATE: undefined,
  BOOKMARK_REMOVE: undefined,
  BOOKMARK_SET_EDIT_ID: undefined,
  BOOKMARK_SET_DELETE_ID: undefined,
  BOOKMARK_SET_PARENT_ID: undefined,
  PROFILES_REQUEST: undefined,
  PROFILES_REQUEST_SUCCESS: undefined,
  PROFILES_REQUEST_ERROR: undefined,
  PROFILE_ADD: undefined,
  PROFILE_UPDATE: undefined,
  PROFILE_REMOVE: undefined,
  PROFILE_SET: undefined,
  // STORAGE_GET: undefined,
  // STORAGE_GET_SUCCESS: undefined,
  // STORAGE_GET_ERROR: undefined,
  // STORAGE_UPDATE: undefined,
  // STORAGE_UPDATE_SUCCESS: undefined,
  // STORAGE_UPDATE_ERROR: undefined,
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
