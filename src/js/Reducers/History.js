import { HISTORY_REQUEST_GET, HISTORY_REQUEST_SUCCESS } from '../Constants';

const initState = {
  history: [],
};

const historyReducer = (state = initState, action) => {
  switch (action.type) {
    case HISTORY_REQUEST_GET:
      return state;
    case HISTORY_REQUEST_SUCCESS:
      return Object.assign({}, state, { history: action.history });
    default:
      return state;
  }
};

export default historyReducer;
