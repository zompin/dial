import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import BookmarksItem from './BookmarkItem';
import BookmarkAdd from './BookmarkAdd';

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
  let colorsAcc = [];
  let prevColor = '';

  return (url) => {
    if (colorsAcc.length === 0) {
      colorsAcc = colorsStore.slice();
    }

    let colorIndex = [].reduce.call(
      url,
      (acc, ch) => ch.charCodeAt(0) + acc, 0,
    ) % colorsAcc.length;

    if (prevColor !== '' && prevColor === colorsAcc[colorIndex]) {
      colorIndex -= 1;
    }

    [prevColor] = colorsAcc.splice(colorIndex, 1);

    return prevColor;
  };
};

const onCommand = (command, bookmarks) => {
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
  const bookmarks = useSelector((state) => state.Bookmarks.data);
  const isLoaded = useSelector((state) => state.Bookmarks.isLoaded);
  const parentId = useSelector((state) => state.Profiles.current);
  const getColor = colorGenerator();
  const bookmarksRef = useRef([])
  bookmarksRef.current = bookmarks

  const onNum = (command) => {
    onCommand(command, bookmarksRef.current);
  };

  useEffect(() => {
    browser.commands.onCommand.addListener(onNum);

    return () => {
      browser.commands.onCommand.removeListener(onNum);
    };
  }, []);

  return (
    <div className="bookmarks">
      {
        bookmarks
          .filter((b) => b.parentId === parentId)
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
