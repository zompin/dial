import { batch } from 'react-redux';
import { browser, Bookmarks } from 'webextension-polyfill-ts';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { profilesRequestError, profilesRequestSuccess, setProfile } from './profiles';
import { bookmarksRequestError, bookmarksRequestSuccess } from './bookmarks';
import { getAppFolder, getLocaleMessage } from '../utils';

const setData = (state: [Bookmarks.BookmarkTreeNode[], { selectedProfile: string }]) => async (dispatch: ThunkDispatch<any, any, any>) => {
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
    dispatch(profilesRequestSuccess(bookmarksTree.profiles));
    dispatch(bookmarksRequestSuccess(bookmarksTree.bookmarks));
    dispatch(setProfile(selectedProfile));
  });
};

const setError = (error: any) => (dispatch: Dispatch) => {
  dispatch(profilesRequestError(error));
  dispatch(bookmarksRequestError(error));
};

const getAppData = () => (
  async (dispatch: ThunkDispatch<any, any, any>) => {
    const appFolder = await getAppFolder();

    try {
      const data = await Promise.all([
        browser.bookmarks.getSubTree(appFolder.id),
        browser.storage.local.get(),
      ]);

      await dispatch(setData(data as any));
    } catch (e) {
      dispatch(setError(e));
    }
  }
);

export default getAppData;
