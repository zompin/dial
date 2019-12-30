import { ACTIONS, NAMES, TYPES } from '../constants';
import { getAppFolder } from '../utils';

const getProfiles = async () => {
  const rootFolder = await getAppFolder();
  let children = await browser.bookmarks.getChildren(rootFolder.id);
  children = children.filter((c) => c.type === TYPES.FOLDER);

  if (!children.length) {
    const tmp = await browser.bookmarks.create({
      title: NAMES.PROFILES_DEFAULT,
      parentId: rootFolder.id,
    });

    children.push(tmp);
  }

  return children;
};

const profilesRequestAction = () => ({
  type: ACTIONS.PROFILES_REQUEST,
});

const profilesRequestSuccessAction = (data) => ({
  type: ACTIONS.PROFILES_REQUEST_SUCCESS,
  data,
});

const profilesRequestErrorAction = (error) => ({
  type: ACTIONS.PROFILES_REQUEST_ERROR,
  error,
});

export const getProfilesAction = () => async (dispatch) => {
  let profiles;
  dispatch(profilesRequestAction());

  try {
    profiles = await getProfiles();
    dispatch(profilesRequestSuccessAction(profiles));
  } catch (e) {
    dispatch(profilesRequestErrorAction(e));
  }

  return profiles;
};

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
