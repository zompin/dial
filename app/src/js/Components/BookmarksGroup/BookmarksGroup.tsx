import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';
import BookmarksItem from '../Bookmarks/BookmarkItem';
import BookmarkAdd from '../Bookmarks/BookmarkAdd';
import { bookmarksRequestSuccess } from '../../Actions/bookmarks';
import { IStore } from '../../Reducers';
import './BookmarksGroup.less';
import { getHostFromUrl } from '../../utils';

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

interface IProps {
  selectedIndex: number
  isOpen: boolean
  group: {
    data: IBookmark[]
    profile: IProfile
  }
}

const BookmarksGroup = ({
  group,
  selectedIndex,
  isOpen,
}: IProps) => {
  const dispatch = useDispatch();
  const { isLoaded, data: bookmarks } = useSelector((state: IStore) => state.bookmarks);
  const { data: favicons } = useSelector((state: IStore) => state.favicons);
  const currentProfile = useSelector((state: IStore) => state.profiles.current);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const profilesRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setInterval>>();
  const [maxHeight, setMaxHeight] = React.useState<number | 'none'>(isOpen ? 'none' : 0);
  const getColor = colorGenerator();

  const onSelect = (source: string, target: string) => {
    if (source === target) {
      return;
    }
    const newBookmarkTree = bookmarks.reduce<IBookmark[]>((acc, b, i) => {
      if (b.id === target || b.id === source) {
        const sourceBookmarkIndex = bookmarks.findIndex(fb => fb.id === source);
        const targetBookmarkIndex = bookmarks.findIndex(fb => fb.id === target);

        if (sourceBookmarkIndex === -1 || targetBookmarkIndex === -1) {
          return acc;
        }

        const sourceBookmark = bookmarks[sourceBookmarkIndex];
        const targetBookmark = bookmarks[targetBookmarkIndex];

        if (b.id === target) {
          if (sourceBookmarkIndex > targetBookmarkIndex) {
            acc.push(sourceBookmark);
            acc.push(targetBookmark);
          }

          if (sourceBookmarkIndex < targetBookmarkIndex) {
            acc.push(targetBookmark);
            acc.push(sourceBookmark);
          }
        }
      } else {
        acc.push(b);
      }

      return acc;
    }, []);
    dispatch(bookmarksRequestSuccess(newBookmarkTree));
    const index = newBookmarkTree.filter(b => b.parentId === currentProfile).findIndex(b => b.id === source);
    browser.bookmarks.move(source, { index });
  };

  const onPreSelect = () => {

  };

  React.useEffect(() => {
    const inner = innerRef.current;
    const profiles = profilesRef.current;

    if (!inner || !profiles) {
      return;
    }

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (isOpen) {
        setMaxHeight(inner.clientHeight);
      } else {
        setMaxHeight(window.innerHeight - profiles.clientHeight);
      }
    }, 20);
  }, [isOpen]);

  React.useEffect(() => {
    profilesRef.current = document.querySelector('.profiles');
  }, []);

  return (
    <div
      className="bookmarks-group"
      key={group.profile.id}
      style={{
        transform: `translateX(${-100 * selectedIndex}%)`,
        maxHeight,
      }}
    >
      <div className="bookmarks-group__inner" ref={innerRef}>
        {
          group.data.map((b, i) => (
            <BookmarksItem
              key={b.id}
              id={b.id}
              url={b.url}
              title={b.title}
              color={getColor(b.url)}
              index={i}
              onSelect={onSelect}
              onPreSelect={onPreSelect}
              favicon={favicons[getHostFromUrl(b.url)]}
            />
          ))
        }
        {
          isLoaded && (
            <BookmarkAdd index={group.data.length} profile={group.profile.id} />
          )
        }
      </div>
    </div>
  );
};

export default BookmarksGroup;
