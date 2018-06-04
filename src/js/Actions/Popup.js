import {
  SHOW_ADD_POPUP,
  HIDE_ADD_POPUP,
  SHOW_EDIT_POPUP,
  HIDE_EDIT_POPUP,
  SHOW_DIALOG,
  HIDE_DIALOG,
} from '../ActionTypes';

export const showAddPopup = () => ({
  type: SHOW_ADD_POPUP,
});

export const hideAddPopup = () => ({
  type: HIDE_ADD_POPUP,
});

export const showEditPopup = (onAccept, message) => ({
  payload: { onAccept, message },
  type: SHOW_EDIT_POPUP,
});

export const hideEditPopup = () => ({
  type: HIDE_EDIT_POPUP,
});

export const showDialog = (onAccept, message) => ({
  type: SHOW_DIALOG,
  onAccept,
  message,
});

export const hideDialog = () => ({
  type: HIDE_DIALOG,
});
