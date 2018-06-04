import {
  BOOKMARKS_TOGGLE,
  BOOKMARKS_REQUEST_GET,
  BOOKMARKS_REQUEST_SUCCESS,
  BOOKMARK_REQUEST_SUCCESS,
  BOOKMARK_CLEAN,
} from '../ActionTypes';

const initState = {
  bookmarks: [],
  bookmarksFolder: null,
  isBookmarksLoaded: false,
  isBookmarksEditable: false,
  currentBookmark: {},
};

const BookmarksReducer = (state = initState, action) => {
  switch (action.type) {
    case BOOKMARKS_TOGGLE:
      return Object.assign({}, state, { isBookmarksEditable: !state.isBookmarksEditable });
    case BOOKMARKS_REQUEST_GET:
      return Object.assign({}, state, { isBookmarksLoaded: false });
    case BOOKMARKS_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          bookmarks: action.bookmarks,
          isBookmarksLoaded: true,
          bookmarksFolder: action.bookmarksFolder,
        },
      );
    case BOOKMARK_REQUEST_SUCCESS:
      return Object.assign({}, state, { currentBookmark: action.bookmark });
    case BOOKMARK_CLEAN:
      return Object.assign({}, state, { currentBookmark: {} });
    default: return state;
  }
};

export default BookmarksReducer;
