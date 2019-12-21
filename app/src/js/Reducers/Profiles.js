import { ACTIONS } from '../constants';

const initState = {
  isLoaded: false,
  error: null,
  data: [],
  isAdded: true,
  isAdding: false,
  isUpdated: true,
  isUpdating: false,
  isRemoved: true,
  isRemoving: false,
  current: {},
};

export default (state = initState, action) => {
  switch (action.type) {
  case ACTIONS.PROFILES_REQUEST:
    return {
      ...state,
      isLoaded: false,
      error: null,
      data: [],
    };
  case ACTIONS.PROFILES_REQUEST_SUCCESS:
    return {
      ...state,
      isLoaded: true,
      error: null,
      data: action.data,
      current: action.data.length ? action.data[0] : {},
    };
  case ACTIONS.PROFILES_REQUEST_ERROR:
    return {
      ...state,
      isLoaded: false,
      error: action.error,
      data: [],
    };
  case ACTIONS.PROFILE_ADD:
    return {
      ...state,
      isAdded: false,
      isAdding: true,
    };
  case ACTIONS.PROFILE_ADD_SUCCESS:
    return {
      ...state,
      isAdded: true,
      isAdding: false,
      data: [...state.data, action.profile],
    };
  case ACTIONS.PROFILE_UPDATE:
    return {
      ...state,
      isUpdating: true,
      isUpdated: false,
    };
  case ACTIONS.PROFILE_UPDATE_SUCCESS:
    return {
      ...state,
      isUpdating: false,
      isUpdated: true,
      data: state.data.map((p) => {
        if (p.id === action.profile.id) {
          return action.profile;
        }

        return p;
      }),
    };
  case ACTIONS.PROFILE_REMOVE:
    return {
      ...state,
      isRemoving: true,
      isRemoved: false,
    };
  case ACTIONS.PROFILE_REMOVE_SUCCESS:
    return {
      ...state,
      isRemoving: false,
      isRemoved: true,
      data: state.data.filter((p) => p.id !== action.id),
    };
  case ACTIONS.PROFILE_SET:
    return {
      ...state,
      current: action.id,
    };
  default:
    return state;
  }
};
