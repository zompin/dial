import * as React from 'react';
import { useSelector } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';
import BookmarksItem from './BookmarkItem';
import BookmarkAdd from './BookmarkAdd';
import { IStore } from '../../Reducers';

const colorGenerator = () => {
  const colorsStore = [
    'purple',
    'gray-dark',
    'orange',
    'gray',
    'red',
    'blue',
    'blue-dark',
  ];
  let colorsAcc: string[] = [];
  let prevColor = '';

  return (url: string) => {
    if (colorsAcc.length === 0) {
      colorsAcc = colorsStore.slice();
    }

    let colorIndex = [].reduce.call(
      url,
      (acc: string, ch: string) => ch.charCodeAt(0) + acc, 0,
    ) % colorsAcc.length;

    if (prevColor !== '' && prevColor === colorsAcc[colorIndex]) {
      colorIndex -= 1;
    }

    [prevColor] = colorsAcc.splice(colorIndex, 1);

    return prevColor;
  };
};

const onCommand = (command: string, bookmarks: IBookmark[]) => {
  if (command.indexOf('-') === -1) {
    return;
  }

  const pieces = command.split('-');
  const numberString = pieces[1];

  if (!numberString) {
    return;
  }

  let number = +numberString;

  if (typeof number !== 'number') {
    return;
  }

  if (number === 0) {
    number = 9;
  } else {
    number -= 1;
  }

  if (!bookmarks[number] || !bookmarks[number].url) {
    return;
  }

  location.href = bookmarks[number].url;
};

const BookmarksList = () => {
  const parentId = useSelector((state: IStore) => state.profiles.current);
  const bookmarks = useSelector((state: IStore) => state.bookmarks.data)
    .filter((b) => b.parentId === parentId);
  const isLoaded = useSelector((state: IStore) => state.bookmarks.isLoaded);
  const getColor = colorGenerator();
  const bookmarksRef = React.useRef([]);
  bookmarksRef.current = bookmarks;

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
    <div className="bookmarks">
      {
        bookmarks
          .map((b, i) => (
            <BookmarksItem
              key={b.id}
              id={b.id}
              url={b.url}
              title={b.title}
              color={getColor(b.url)}
              index={i}
            />
          ))
      }
      {
        isLoaded && (
          <BookmarkAdd />
        )
      }
    </div>
  );
};

export default BookmarksList;
