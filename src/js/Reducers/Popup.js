import {
  SHOW_ADD_POPUP,
  HIDE_ADD_POPUP,
  SHOW_EDIT_POPUP,
  HIDE_EDIT_POPUP,
  SHOW_DIALOG,
  HIDE_DIALOG,
  POPUP_DISABLE_CLOSE,
  POPUP_ENABLE_CLOSE,
} from '../ActionTypes';

const initState = {
  isAddPopupVisible: false,
  isEditPopupVisible: false,
  isDialogVisible: false,
  dialogMessage: '',
  isCloseable: true,
  dialogAcceptCallback: () => {},
};

const PopupReducer = (state = initState, action) => {
  switch (action.type) {
  case SHOW_ADD_POPUP:
    return Object.assign({}, state, { isAddPopupVisible: true });
  case HIDE_ADD_POPUP:
    if (!state.isCloseable) {
      return state;
    }

    return Object.assign({}, state, { isAddPopupVisible: false });
  case SHOW_EDIT_POPUP:
    return Object.assign({}, state, { isEditPopupVisible: true });
  case HIDE_EDIT_POPUP:
    return Object.assign({}, state, { isEditPopupVisible: false });
  case SHOW_DIALOG:
    return Object.assign({}, state, {
      isDialogVisible: true,
      dialogMessage: action.message,
      dialogAcceptCallback: action.onAccept,
    });
  case HIDE_DIALOG:
    return Object.assign({}, state, { isDialogVisible: false });
  case POPUP_DISABLE_CLOSE:
    return Object.assign({}, state, { isCloseable: false });
  case POPUP_ENABLE_CLOSE:
    return Object.assign({}, state, { isCloseable: true });
  default: return state;
  }
};

export default PopupReducer;
