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

export const { bookmarks, commands } = browser;
