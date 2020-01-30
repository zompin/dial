import { batch } from 'react-redux';
import {
  profilesRequestAction, profilesRequestErrorAction, profilesRequestSuccessAction, setProfile,
} from './Profiles';
import { bookmarksRequestAction, bookmarksRequestErrorAction, bookmarksRequestSuccessAction } from './Bookmarks';
import { getAppFolder, getLocaleMessage } from '../utils';

const resetState = () => (dispatch) => {
  batch(() => {
    dispatch(bookmarksRequestAction());
    dispatch(profilesRequestAction());
  });
};

const setData = (state) => async (dispatch) => {
  const { selectedProfile } = state[1];
  const bookmarksTree = state[0].reduce((acc, item) => {
    item.children.forEach((p) => {
      if (!p.url) {
        acc.profiles.push({
          id: p.id,
          parentId: p.parentId,
          title: p.title,
        });
      }

      p.children.forEach((b) => {
        if (b.url) {
          acc.bookmarks.push({
            id: b.id,
            parentId: b.parentId,
            title: b.title,
            url: b.url,
          });
        }
      });
    });

    return acc;
  }, { profiles: [], bookmarks: [] });

  if (!bookmarksTree.profiles.length) {
    const appFolder = await getAppFolder();
    const defaultProfile = await browser.bookmarks.create({
      parentId: appFolder.id,
      title: getLocaleMessage('defaultProfileName'),
    });

    bookmarksTree.profiles.push({
      id: defaultProfile.id,
      parentId: defaultProfile.parentId,
      title: defaultProfile.title,
    });
  }


  batch(() => {
    dispatch(setProfile(selectedProfile));
    dispatch(profilesRequestSuccessAction(bookmarksTree.profiles));
    dispatch(bookmarksRequestSuccessAction(bookmarksTree.bookmarks));
  });
};

const setError = (error) => (dispatch) => {
  dispatch(profilesRequestErrorAction(error));
  dispatch(bookmarksRequestErrorAction(error));
};

const getAppData = () => (
  async (dispatch) => {
    dispatch(resetState());
    const appFolder = await getAppFolder();

    try {
      const data = await Promise.all([
        browser.bookmarks.getSubTree(appFolder.id),
        browser.storage.local.get(),
      ]);

      dispatch(setData(data));
    } catch (e) {
      dispatch(setError(e));
    }
  }
);

export default getAppData;
