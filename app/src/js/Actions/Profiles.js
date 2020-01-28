import { ACTIONS } from '../constants';

export const profilesRequestAction = () => ({
  type: ACTIONS.PROFILES_REQUEST,
});

export const profilesRequestSuccessAction = (data) => ({
  type: ACTIONS.PROFILES_REQUEST_SUCCESS,
  data,
});

export const profilesRequestErrorAction = (error) => ({
  type: ACTIONS.PROFILES_REQUEST_ERROR,
  error,
});

export const profileAdd = (profile) => ({
  type: ACTIONS.PROFILE_ADD,
  profile,
});

export const profileUpdate = (id, title) => ({
  type: ACTIONS.PROFILE_UPDATE,
  id,
  title,
});

export const profileRemove = (id) => ({
  type: ACTIONS.PROFILE_REMOVE,
  id,
});

export const setProfile = (id) => ({
  type: ACTIONS.PROFILE_SET,
  id,
});
