import { browser } from 'webextension-polyfill-ts';
import { NAMES } from './constants';

export const getLocaleMessage = (name: string, content?: string | string[]) => (
  browser.i18n.getMessage(name, content)
);

export const getAppFolder = (() => {
  let dialFolder: IProfile | null = null;

  return async () => {
    if (dialFolder) {
      return dialFolder;
    }

    const rootBookmarks = await browser.bookmarks.getChildren(NAMES.ROOT_FOLDER);
    dialFolder = rootBookmarks.find((b) => b.title === NAMES.APP_FOLDER && !b.url);

    if (!dialFolder) {
      dialFolder = await browser.bookmarks.create({
        title: NAMES.APP_FOLDER,
        parentId: NAMES.ROOT_FOLDER,
      });
    }

    return dialFolder;
  };
})();
