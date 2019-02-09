import { STORAGE_GET_SUCCESS, STORAGE_UPDATE_SUCCESS } from '../ActionTypes';

const initState = {};

const StorageReducer = (state = initState, action) => {
  switch (action.type) {
    case STORAGE_GET_SUCCESS:
      return Object.assign({}, state, action.storage);
    case STORAGE_UPDATE_SUCCESS:
      return state;
    default:
      return state;
  }
};

export default StorageReducer;
