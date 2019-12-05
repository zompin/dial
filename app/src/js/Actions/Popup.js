import {
  POPUP_DISABLE_CLOSE,
  POPUP_ENABLE_CLOSE,
  POPUP_SHOW,
  POPUP_HIDE,
} from '../ActionTypes';

export const disableCloseAction = () => ({
  type: POPUP_DISABLE_CLOSE,
});

export const enableCloseAction = () => ({
  type: POPUP_ENABLE_CLOSE,
});

export const showPopupAction = name => ({
  type: POPUP_SHOW,
  name,
});

export const hidePopupAction = name => ({
  type: POPUP_HIDE,
  name,
});
