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
  case ACTIONS.BOOKMARK_ADD_SUCCESS:
    return {
      ...state,
      bookmarks: state.bookmarks.map((g) => {
        if (g.parentId !== action.parentId) {
          return g;
        }

        const items = [...g.items, action.bookmark];

        return { ...g, items };
      }),
    };
  case ACTIONS.BOOKMARK_UPDATE_SUCCESS:
    return {
      ...state,
      bookmarks: state.bookmarks.map((b) => {
        if (b.id === action.bookmark.id) {
          return action.bookmark;
        }

        return b;
      }),
    };
  case ACTIONS.BOOKMARK_REMOVE_SUCCESS:
    return {
      ...state,
      bookmarks: state.bookmarks.map((g) => {
        const items = g.items.filter(b => b.id !== action.id);

        return { ...g, items };
      }),
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
