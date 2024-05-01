import { batch } from 'react-redux';
import { browser, Bookmarks } from 'webextension-polyfill-ts';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { profilesRequestError, profilesRequestSuccess, setProfile } from './profiles';
import { bookmarksRequestError, bookmarksRequestSuccess } from './bookmarks';
import { getAppFolder, getLocaleMessage } from '../utils';
import { faviconsSuccess } from './favicons';

const setData = (state: [Bookmarks.BookmarkTreeNode[], Record<string, any>]) => async (dispatch: ThunkDispatch<any, any, any>) => {
  const storage = state[1];
  const { selectedProfile } = storage;
  const bookmarksInAppFolder: IBookmark[] = [];
  const bookmarksTree = state[0].reduce((acc, item) => {
    item.children.forEach((p) => {
      if (!p.url) {
        acc.profiles.push({
          id: p.id,
          parentId: p.parentId,
          title: p.title,
        });
      }

      if (p.children) {
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
      } else {
        bookmarksInAppFolder.push(p as IBookmark);
      }
    });

    return acc;
  }, { profiles: [], bookmarks: [] });

  const favicons = Object.keys(storage).reduce<Record<string, IFavicon>>((acc, k) => {
    if (k.indexOf('favicon-') === 0 && storage[k] && storage[k].image) {
      const id = k.split('-')[1];

      if (id) {
        acc[id] = storage[k];
      }
    }

    return acc;
  }, {});

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

  bookmarksInAppFolder.forEach((b) => {
    browser.bookmarks.move(b.id, { parentId: bookmarksTree.profiles[0].id });
  });

  batch(() => {
    dispatch(faviconsSuccess(favicons));
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
