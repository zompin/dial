import {
  SHOW_ADD_POPUP,
  HIDE_ADD_POPUP,
  SHOW_EDIT_POPUP,
  HIDE_EDIT_POPUP,
  SHOW_DIALOG,
  HIDE_DIALOG,
} from '../Constants';

const initState = {
  isAddPopupVisible: false,
  isEditPopupVisible: false,
  isDialogVisible: false,
};

const PopupReducer = (state = initState, action) => {
  switch (action.type) {
    case SHOW_ADD_POPUP:
      return Object.assign({}, state, { isAddPopupVisible: true });
    case HIDE_ADD_POPUP:
      return Object.assign({}, state, { isAddPopupVisible: false });
    case SHOW_EDIT_POPUP:
      return Object.assign({}, state, { isEditPopupVisible: true });
    case HIDE_EDIT_POPUP:
      return Object.assign({}, state, { isEditPopupVisible: false });
    case SHOW_DIALOG:
      return Object.assign({}, state, { isDialogVisible: true });
    case HIDE_DIALOG:
      return Object.assign({}, state, { isDialogVisible: false });
    default: return state;
  }
};

export default PopupReducer;
