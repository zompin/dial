import { ACTIONS, NAMES, TYPES } from '../constants';
import { bookmarks as browserBookmarks } from '../utils';

const getRootFolder = (() => {
  let dialFolder = null;

  return async () => {
    if (dialFolder) {
      return dialFolder;
    }

    const rootBookmarks = await browserBookmarks.getChildren(NAMES.ROOT_FOLDER);
    dialFolder = rootBookmarks.find(b => b.title === NAMES.APP_FOLDER && b.type === TYPES.FOLDER);

    if (!dialFolder) {
      dialFolder = await browserBookmarks.create({
        title: NAMES.APP_FOLDER,
        parentId: NAMES.ROOT_FOLDER,
      });
    }

    return dialFolder;
  };
})();

const getProfiles = async () => {
  const rootFolder = await getRootFolder();
  let children = await browserBookmarks.getChildren(rootFolder.id);
  children = children.filter(c => c.type === TYPES.FOLDER);

  if (!children.length) {
    const tmp = await browserBookmarks.create({
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

const profilesRequestSuccessAction = data => ({
  type: ACTIONS.PROFILES_REQUEST_SUCCESS,
  data,
});

const profilesRequestErrorAction = error => ({
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

const profileAddAction = () => ({
  type: ACTIONS.PROFILE_ADD,
});

const profileAddSuccessAction = profile => ({
  type: ACTIONS.PROFILE_ADD_SUCCESS,
  profile,
});

const profileAddErrorAction = error => ({
  type: ACTIONS.PROFILE_ADD_ERROR,
  error,
});

export const addProfileAction = title => async (dispatch) => {
  dispatch(profileAddAction());

  try {
    const rootFolder = await getRootFolder();
    const profile = await browserBookmarks.create({
      title,
      parentId: rootFolder.id,
    });

    dispatch(profileAddSuccessAction(profile));
  } catch (e) {
    dispatch(profileAddErrorAction(e));
  }
};

const profileUpdateAction = () => ({
  type: ACTIONS.PROFILE_UPDATE,
});

const profileUpdateSuccessAction = profile => ({
  type: ACTIONS.PROFILE_UPDATE_SUCCESS,
  profile,
});

const profileUpdateErrorAction = error => ({
  type: ACTIONS.PROFILE_UPDATE_ERROR,
  error,
});

export const updateProfileAction = (id, title) => async (dispatch) => {
  dispatch(profileUpdateAction());

  try {
    const profile = await browserBookmarks.update({
      id,
      title,
    });
    dispatch(profileUpdateSuccessAction(profile));
  } catch (e) {
    dispatch(profileUpdateErrorAction(e));
  }
};

const profileRemoveAction = () => ({
  type: ACTIONS.PROFILE_REMOVE,
});

const profileRemoveSuccess = id => ({
  type: ACTIONS.PROFILE_REMOVE_SUCCESS,
  id,
});

const profileRemoveError = error => ({
  type: ACTIONS.PROFILE_REMOVE_ERROR,
  error,
});

export const removeProfileAction = id => async (dispatch) => {
  dispatch(profileRemoveAction());

  try {
    await browserBookmarks.remove(id);
    dispatch(profileRemoveSuccess(id));
  } catch (e) {
    dispatch(profileRemoveError(e));
  }
};

export const setProfileAction = id => ({
  type: ACTIONS.PROFILE_SET,
  id,
});
