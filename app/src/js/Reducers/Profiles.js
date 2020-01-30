import { ACTIONS } from '../constants';

const initState = {
  isLoaded: false,
  error: null,
  data: [],
  current: '',
};

export default (state = initState, action) => {
  const {
    type, data, error, profile, title, id,
  } = action;
  switch (type) {
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
      data,
    };
  case ACTIONS.PROFILES_REQUEST_ERROR:
    return {
      ...state,
      isLoaded: false,
      error,
      data: [],
    };
  case ACTIONS.PROFILE_ADD:
    return {
      ...state,
      data: [...state.data, profile],
    };
  case ACTIONS.PROFILE_UPDATE:
    return {
      ...state,
      data: state.data.map((d) => {
        if (d.id === id) {
          return {
            ...d,
            title,
          };
        }

        return d;
      }),
    };
  case ACTIONS.PROFILE_REMOVE:
    return {
      ...state,
      data: state.data.filter((d) => d.id !== id),
    };
  case ACTIONS.PROFILE_SET:
    return {
      ...state,
      current: state.data.find((d) => d.id === id) ? id : state.data[0].id,
    };
  default:
    return state;
  }
};
