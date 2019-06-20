import { ACTIONS } from '../constants';

const initState = {
  isCloseable: true,
  show: {},
};

const PopupReducer = (state = initState, action) => {
  switch (action.type) {
  case ACTIONS.POPUP_SHOW:
    return {
      ...state,
      show: {
        [action.name]: true,
      },
      payload: {
        [action.name]: action.payload,
      },
    };
  case ACTIONS.POPUP_HIDE:
    if (!state.isCloseable) {
      return state;
    }

    return {
      ...state,
      show: {
        [action.name]: false,
      },
      payload: {
        [action.name]: null,
      },
    };
  case ACTIONS.POPUP_DISABLE_CLOSE:
    return {
      ...state,
      isCloseable: false,
    };
  case ACTIONS.POPUP_ENABLE_CLOSE:
    return {
      ...state,
      isCloseable: true,
    };
  default: return state;
  }
};

export default PopupReducer;
