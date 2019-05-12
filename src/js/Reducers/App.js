import {
  APP_CTRL_DOWN,
  APP_CTRL_UP,
} from '../ActionTypes';

const initState = {
  ctrl: false,
};

export default (state = initState, action) => {
  switch (action.type) {
  case APP_CTRL_DOWN:
    return {
      ...state,
      ctrl: true,
    };
  case APP_CTRL_UP:
    return {
      ...state,
      ctrl: false,
    };
  default:
    return state;
  }
};
