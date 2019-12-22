import { ACTIONS } from '../constants';

const initState = {
  data: [],
  isLoaded: false,
  bookmarkEditId: '',
  bookmarkDeleteId: '',
  bookmarkParentId: '',
};

const BookmarksReducer = (state = initState, action) => {
  const {
    type, data, bookmarkEditId, bookmarkDeleteId, bookmarkParentId, bookmark, id, title, url,
  } = action;
  switch (type) {
  case ACTIONS.BOOKMARKS_REQUEST:
    return {
      ...state,
      data: [],
      isLoaded: false,
    };
  case ACTIONS.BOOKMARKS_REQUEST_SUCCESS:
    return {
      ...state,
      isLoaded: true,
      data,
    };
  case ACTIONS.BOOKMARK_SET_EDIT_ID:
    return {
      ...state,
      bookmarkEditId,
    };
  case ACTIONS.BOOKMARK_SET_DELETE_ID:
    return {
      ...state,
      bookmarkDeleteId,
    };
  case ACTIONS.BOOKMARK_SET_PARENT_ID:
    return {
      ...state,
      bookmarkParentId,
    };
  case ACTIONS.BOOKMARK_ADD:
    return {
      ...state,
      data: [...state.data, bookmark],
    };
  case ACTIONS.BOOKMARK_UPDATE:
    return {
      ...state,
      data: state.data.map((d) => {
        if (d.id === id) {
          return {
            ...d,
            title,
            url,
          };
        }

        return d;
      }),
    };
  case ACTIONS.BOOKMARK_REMOVE:
    return {
      ...state,
      data: state.data.filter((d) => d.id !== id),
    };
  default: return state;
  }
};

export default BookmarksReducer;
