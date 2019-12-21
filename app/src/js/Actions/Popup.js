import { ACTIONS } from '../constants';

export const disableCloseAction = () => ({
  type: ACTIONS.POPUP_DISABLE_CLOSE,
});

export const enableCloseAction = () => ({
  type: ACTIONS.POPUP_ENABLE_CLOSE,
});

export const showPopupAction = (name, payload) => ({
  type: ACTIONS.POPUP_SHOW,
  name,
  payload,
});

export const hidePopupAction = name => ({
  type: ACTIONS.POPUP_HIDE,
  name,
});