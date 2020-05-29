import { browser, Bookmarks } from 'webextension-polyfill-ts';
import { getAppFolder, getHostFromUrl } from './src/js/utils';

const cache: Record<string, IFavicon> = {};
const CACHE_TIMEOUT = 1000; // 1000 * 60 * 60;
const img = document.createElement('img');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

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

  if (cache[host] && cache[host].timestamp + CACHE_TIMEOUT > Date.now()) {
    return;
  }

  img.src = favIconUrl;
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  await browser.storage.local.clear();

  const colorsObject = ctx.getImageData(0, 0, img.width, img.height).data
    .reduce<Record<string, { count: number, raw: number[] }>>((acc, item, i, source) => {
      if (i % 4 === 0) {
        const color = [
          source[i],
          source[i + 1],
          source[i + 2],
          source[i + 3],
        ];

        const colorString = color.join(',');

        if (acc[colorString]) {
          ++acc[colorString].count;
        } else {
          acc[colorString] = {
            raw: color,
            count: 1,
          };
        }
      }

      return acc;
    }, {});
  await browser.storage.local.set({ test: colorsObject });
  const colors = Object.keys(colorsObject)
    .map(k => ({ color: colorsObject[k].raw, count: colorsObject[k].count }))
    .filter(c => c.count > 1);

  colors.sort((a, b) => {
    if (a.count > b.count) {
      return 1;
    }

    if (a.count < b.count) {
      return -1;
    }

    return 0;
  });

  const favicon: IFavicon = {
    timestamp: Date.now(),
    image: favIconUrl,
    colors: colors,
  };

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

main()
