import { browser, Bookmarks } from 'webextension-polyfill-ts';
import {getAppFolder, getHostFromUrl} from './src/js/utils';

const cache: Record<string, IFavicon> = {};
const CACHE_TIMEOUT = 1000 * 60 * 60;

const job = async (items: Bookmarks.BookmarkTreeNode[]) => {
  const tabs = await browser.tabs.query({ active: true });
  const currentTab = tabs[0];
  const { favIconUrl, url } = currentTab;
  const host = getHostFromUrl(url);

  if (cache[host] || !currentTab.favIconUrl || !currentTab) {
    return;
  }

  if (currentTab.url.indexOf('moz-extension') === 0) {
    return;
  }

  const bookmark = items.find(i => i.url && getHostFromUrl(i.url) === host);

  if (!bookmark) {
    return;
  }

  const favicon: IFavicon = {
    timestamp: Date.now(),
    image: favIconUrl,
  };

  if (cache[host] && cache[host].timestamp + CACHE_TIMEOUT > Date.now()) {
    return;
  }

  cache[host] = favicon;

  await browser.storage.local.set({ [`favicon-${host}`]: favicon });
};

const main = async() => {
  const appFolder = await getAppFolder();

  if (!appFolder) {
    return;
  }

  const bookmarks = (await browser.bookmarks.getSubTree(appFolder.id)).reduce<Bookmarks.BookmarkTreeNode[]>((acc, item) => {
    if (item.children) {
      item.children.forEach(p => {
        if (p.children) {
          p.children.forEach(b => {
            if (b.url) {
              acc.push(b);
            }
          });
        }
      });
    }

    return acc;
  }, []) as IBookmark[];

  setInterval(() => job(bookmarks), 1000);
};

main();
