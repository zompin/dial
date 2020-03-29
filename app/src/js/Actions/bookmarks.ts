import { createAction } from 'redux-act';

export const bookmarksRequest = createAction('BOOKMARKS_REQUEST');
export const bookmarksRequestSuccess = createAction<IBookmark[]>('BOOKMARKS_REQUEST_SUCCESS');
export const bookmarksRequestError = createAction<any>('BOOKMARKS_REQUEST_ERROR');
export const bookmarkAdd = createAction<IBookmark>('BOOKMARK_ADD');
export const bookmarkUpdate = createAction<Omit<IBookmark, 'parentId'>>('BOOKMARK_UPDATE');
export const bookmarkRemove = createAction<string>('BOOKMARK_REMOVE');
export const bookmarkSetEditId = createAction<string>('BOOKMARK_SET_EDIT_ID');
export const bookmarkSetDeleteId = createAction<string>('BOOKMARK_SET_DELETE_ID');
export const bookmarkSetParentId = createAction<string>('BOOKMARK_SET_PARENT_ID');
