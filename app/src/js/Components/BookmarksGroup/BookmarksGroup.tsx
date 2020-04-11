import * as React from 'react';
import BookmarksItem from '../Bookmarks/BookmarkItem';
import BookmarkAdd from '../Bookmarks/BookmarkAdd';
import { useSelector } from 'react-redux';
import { IStore } from '../../Reducers';
import './BookmarksGroup.less';

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
  const isLoaded = useSelector((state: IStore) => state.bookmarks.isLoaded);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = React.useState<number | 'none'>(isOpen ? 'none' : 0);
  const getColor = colorGenerator();

  React.useEffect(() => {
    const inner = innerRef.current;

    if (!inner) {
      return;
    }

    if (isOpen) {
      setMaxHeight(inner.clientHeight);
    } else {
      setMaxHeight(0);
    }
  }, [isOpen]);

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
