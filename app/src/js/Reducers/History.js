import { ACTIONS } from '../constants';

const initState = {
  history: [],
};

const historyReducer = (state = initState, action) => {
  switch (action.type) {
  case ACTIONS.HISTORY_REQUEST:
    return state;
  case ACTIONS.HISTORY_REQUEST_SUCCESS:
    return {
      ...state,
      history: action.history,
    };

  default:
    return state;
  }
};

export default historyReducer;
