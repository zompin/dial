import * as React from 'react';
import { useDispatch } from 'react-redux';
import XButton from '../XButton';
import EditButton from '../EditButton';
import { bookmarkSetEditId, bookmarkSetDeleteId } from '../../Actions/bookmarks';

interface IProps {
  id: string
  url: string
  title: string
  color: string
  index: number
}

const BookmarkItem = ({
  id,
  url,
  title,
  color,
  index,
}: IProps) => {
  const dispatch = useDispatch();
  const urlPosStart = url.indexOf('//');
  const urlPosEnd = url.indexOf('/', urlPosStart + 2);
  const filteredUrl = url.substring(urlPosStart + 2, urlPosEnd);

  const onEdit = (bookmarkId: string) => {
    dispatch(bookmarkSetEditId(bookmarkId));
  };

  const onDelete = (bookmarkId: string) => {
    dispatch(bookmarkSetDeleteId(bookmarkId));
  };

  return (
    <div
      className={`bookmark bookmark_${color}`}
      style={{
        animationDelay: `${index * 0.02}s`,
      }}
    >
      <a className="bookmark__link" href={url}>
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
