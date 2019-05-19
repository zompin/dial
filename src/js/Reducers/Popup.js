import {
  POPUP_DISABLE_CLOSE,
  POPUP_ENABLE_CLOSE,
  POPUP_SHOW,
  POPUP_HIDE,
} from '../ActionTypes';

const initState = {
  isCloseable: true,
  show: {},
};

const PopupReducer = (state = initState, action) => {
  switch (action.type) {
  case POPUP_SHOW:
    return {
      ...state,
      show: {
        [action.name]: true,
      },
    };
  case POPUP_HIDE:
    if (!state.isCloseable) {
      return state;
    }

    return {
      ...state,
      show: {
        [action.name]: false,
      },
    };
  case POPUP_DISABLE_CLOSE:
    return Object.assign({}, state, { isCloseable: false });
  case POPUP_ENABLE_CLOSE:
    return Object.assign({}, state, { isCloseable: true });
  default: return state;
  }
};

export default PopupReducer;
