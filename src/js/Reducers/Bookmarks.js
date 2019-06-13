import { ACTIONS } from '../constants';

const initState = {
  bookmarks: [],
  bookmarksFolder: null,
  isBookmarksLoaded: false,
  isBookmarksEditable: false,
  currentBookmark: {},
};

const BookmarksReducer = (state = initState, action) => {
  switch (action.type) {
  case ACTIONS.BOOKMARKS_TOGGLE:
    return {
      ...state,
      isBookmarksEditable: !state.isBookmarksEditable,
    };
  case ACTIONS.BOOKMARKS_REQUEST:
    return {
      ...state,
      isBookmarksLoaded: false,
    };
  case ACTIONS.BOOKMARKS_REQUEST_SUCCESS:
    return {
      ...state,
      bookmarks: action.bookmarks,
      isBookmarksLoaded: true,
      bookmarksFolder: action.bookmarksFolder,
    };
  case ACTIONS.BOOKMARK_REQUEST_SUCCESS:
    return {
      ...state,
      currentBookmark: action.bookmark,
    };
  case ACTIONS.BOOKMARK_CLEAN:
    return {
      ...state,
      currentBookmark: {},
    };
  default: return state;
  }
};

export default BookmarksReducer;
