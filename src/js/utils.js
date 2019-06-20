export const getLocaleMessage = (name, content) => (
  browser.i18n.getMessage(name, content)
);

export const { bookmarks, commands } = browser;
