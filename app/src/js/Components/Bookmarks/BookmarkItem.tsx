import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import XButton from '../XButton';
import EditButton from '../EditButton';
import { bookmarkSetEditId, bookmarkSetDeleteId } from '../../Actions/bookmarks';

interface IProps {
  id: string
  url: string
  title: string
  color: string
  index: number
  onSelect: (source: string, target: string) => void
  onPreSelect: (source: string, target: string) => void
}

const BookmarkItem = ({
  id,
  url,
  title,
  color,
  index,
  onSelect,
  onPreSelect,
}: IProps) => {
  const dispatch = useDispatch();
  const [isDraggable, setIsDraggable] = React.useState(false);
  const urlPosStart = url.indexOf('//');
  const urlPosEnd = url.indexOf('/', urlPosStart + 2);
  const filteredUrl = url.substring(urlPosStart + 2, urlPosEnd);

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
      className={`bookmark bookmark_${color}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{
        animationDelay: `${index * 0.007}s`,
      }}
    >
      <a
        className="bookmark__link"
        href={url}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        draggable
        style={{
          opacity: isDraggable ? 0 : undefined,
        }}
      >
        <div className="bookmark__title">
          {title}
        </div>
        <div className="bookmark__url">
          <div className="bookmark__url-inner">
            {filteredUrl}
          </div>
        </div>
      </a>
      <XButton
        onClick={() => onDelete(id)}
        className="bookmark"
      />
      <EditButton
        onClick={() => onEdit(id)}
        className="bookmark"
      />
      {
        index < 10 && (
          <div
            className="bookmark__code"
          >
            {`CTRL + ${(index + 1) % 10}`}
          </div>
        )
      }
    </div>
  );
};

export default BookmarkItem;
