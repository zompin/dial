import * as React from 'react';
import { useSelector } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';
import BookmarksGroup from '../BookmarksGroup/BookmarksGroup';
import { IStore } from '../../Reducers';
import * as style from './Bookmarks.module.scss'

const onCommand = (command: string, bookmarks: IBookmark[]) => {
  if (command.indexOf('-') === -1) {
    return;
  }

  const [_, n] = command.split('-');
  let number = +n;

  if (number === 0) {
    number = 9;
  } else {
    number -= 1;
  }

  Promise.all([
    browser.tabs.getCurrent(),
    browser.tabs.query({active: true})
  ]).then(([current, [active]]) => {
    if (current.id === active.id) {
      (document.querySelector(`[href="${bookmarks[number]?.url}"]`) as HTMLAnchorElement)?.click();
    }
  });
};

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

  const onNum = (command: string) => {
    onCommand(command, bookmarksRef.current);
  };

  React.useEffect(() => {
    browser.commands.onCommand.addListener(onNum);

    return () => {
      browser.commands.onCommand.removeListener(onNum);
    };
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
