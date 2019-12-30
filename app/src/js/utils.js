import { NAMES } from './constants';

export const getLocaleMessage = (name, content) => (
  browser.i18n.getMessage(name, content)
);

export const getConstant = (name) => {
  const constants = {
    BOOKMARKS_ROOT: {
      chrome: '2',
      firefox: 'unfiled_____',
    },
  };

  return constants[name][VENDOR];
};


export const getAppFolder = (() => {
  let dialFolder = null;

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
