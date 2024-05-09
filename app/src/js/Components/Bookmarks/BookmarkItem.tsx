import * as React from 'react';
import {useDispatch} from 'react-redux';
import XButton from '../XButton/XButton';
import EditButton from '../EditButton/EditButton';
import { bookmarkSetEditId, bookmarkSetDeleteId } from '../../Actions/bookmarks';
import { getHostFromUrl } from '../../utils';
import cn from 'classnames'
import * as style from './Bookmarks.module.scss'

interface IProps {
  id: string
  url: string
  title: string
  color: string
  index: number
  onSelect: (source: string, target: string) => void
  onPreSelect: (source: string, target: string) => void
  favicon?: IFavicon
}

const BookmarkItem = ({
  id,
  url,
  title,
  color,
  index,
  onSelect,
  onPreSelect,
  favicon,
}: IProps) => {
  const dispatch = useDispatch();
  const [isDraggable, setIsDraggable] = React.useState(false);
  const filteredUrl = getHostFromUrl(url);

  const onEdit = (bookmarkId: string) => {
    dispatch(bookmarkSetEditId(bookmarkId));
  };

  const onDelete = (bookmarkId: string) => {
    dispatch(bookmarkSetDeleteId(bookmarkId));
  };

  const onDragStart = (e: React.DragEvent) => {
    setIsDraggable(true);
    e.dataTransfer.setData('text', id);
  };

  const onDragEnd = () => {
    setIsDraggable(false);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const source = e.dataTransfer.getData('text');
    onPreSelect(source, id);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const source = e.dataTransfer.getData('text');
    onSelect(source, id);
  };

  return (
    <div
      className={cn(style.bookmark, {
        [style.bookmark_red]: color === 'red',
        [style.bookmark_gray]: color === 'gray',
        [style.bookmark_grayDark]: color === 'gray-dark',
        [style.bookmark_orange]: color === 'orange',
        [style.bookmark_blue]: color === 'blue',
        [style.bookmark_purple]: color === 'purple',
        [style.bookmark_blueDark]: color === 'blue-dark',
      })}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{
        animationDelay: `${index * 0.007}s`,
      }}
    >
      <a
        className={style.bookmark__link}
        href={url}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        draggable
        style={{
          opacity: isDraggable ? 0 : undefined,
        }}
      >
        <div className={style.bookmark__title}>
          {
            favicon && favicon.image && (
              <img className={style.bookmark__favicon} src={favicon.image} alt={title} />
            )
          }
          {title}
        </div>
        <div className={style.bookmark__url}>
          <div className={style.bookmark__urlInner}>
            {filteredUrl}
          </div>
        </div>
      </a>
      <XButton
        onClick={() => onDelete(id)}
        className={style.bookmark__remove}
      />
      <EditButton
        onClick={() => onEdit(id)}
        className={style.bookmark__edit}
      />
      {
        index < 10 && (
          <div
            className={style.bookmark__code}
          >
            {`CTRL + ${(index + 1) % 10}`}
          </div>
        )
      }
    </div>
  );
};

export default BookmarkItem;
