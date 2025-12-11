import * as React from 'react';
import { useSelector } from 'react-redux';
import { browser, Tabs } from 'webextension-polyfill-ts';
import BookmarksGroup from '../BookmarksGroup/BookmarksGroup';
import { IStore } from '../../Reducers';
import * as style from './Bookmarks.module.scss'

const BookmarksList = () => {
  const { current , data: profiles } = useSelector((state: IStore) => state.profiles);
  const bookmarks = useSelector((state: IStore) => state.bookmarks.data);
  const bookmarksGrouped = React.useMemo(() => profiles.map((p) => ({
    profile: p,
    data: bookmarks.filter(b => b.parentId === p.id),
  })), [bookmarks, profiles]);
  const index = bookmarksGrouped.findIndex(g => g.profile.id === current);
  const bookmarksRef = React.useRef([]);
  bookmarksRef.current = bookmarks.filter(b => b.parentId === current);

  const onNum = React.useCallback((command: string, tab: Tabs.Tab) => {
    if (command.indexOf('-') === -1) {
      return;
    }

    const [_, n] = command.split('-');
    let number = +n;
    number = number === 0 ? 9 : number - 1;

    const targetBookmark = bookmarksRef.current[number]
    browser.tabs.update(tab.id, { url: targetBookmark.url })
  }, [])

  React.useEffect(() => {
    browser.commands.onCommand.addListener(onNum as any);

    return () => browser.commands.onCommand.removeListener(onNum as any)
  }, []);

  return (
    <div className={style.bookmarks}>
      {
        bookmarksGrouped.map((g, i) => (
          <BookmarksGroup
            key={g.profile.id}
            selectedIndex={index}
            group={g}
            isOpen={i === index}
          />
        ))
      }
    </div>
  );
};

export default BookmarksList;
