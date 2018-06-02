import {
  SHOW_ADD_POPUP,
  HIDE_ADD_POPUP,
  SHOW_EDIT_POPUP,
  HIDE_EDIT_POPUP,
  SHOW_DIALOG,
  HIDE_DIALOG,
} from '../Constants';

export const showAddPopup = () => ({
  // isAddPopupVisible: true,
  type: SHOW_ADD_POPUP,
});

export const hideAddPopup = () => ({
  // isAddPopupVisible: false,
  type: HIDE_ADD_POPUP,
});


export const showEditPopup = () => ({
  // isEditPopupVisible: true,
  type: SHOW_EDIT_POPUP,
});

export const hideEditPopup = () => ({
  // isEditPopupVisible: false,
  type: HIDE_EDIT_POPUP,
});

export const showDialog = () => ({
  // isDialogVisible: true,
  type: SHOW_DIALOG,
});

export const hideDialog = () => ({
  // isDialogVisible: false,
  type: HIDE_DIALOG,
});
