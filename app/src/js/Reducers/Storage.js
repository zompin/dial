import { ACTIONS } from '../constants';

const initState = {};

const StorageReducer = (state = initState, action) => {
  switch (action.type) {
  case ACTIONS.STORAGE_GET_SUCCESS:
    return Object.assign({}, state, action.storage);
  case ACTIONS.STORAGE_UPDATE_SUCCESS:
    return state;
  default:
    return state;
  }
};

export default StorageReducer;
