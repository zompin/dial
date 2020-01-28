import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import XButton from '../XButton';
import EditButton from '../EditButton';
import { setBookmarkEditId, setBookmarkDeleteId } from '../../Actions/Bookmarks';

const BookmarkItem = ({
  id,
  url,
  title,
  color,
  index,
}) => {
  const dispatch = useDispatch();
  const urlPosStart = url.indexOf('//');
  const urlPosEnd = url.indexOf('/', urlPosStart + 2);
  const filteredUrl = url.substring(urlPosStart + 2, urlPosEnd);

  const onEdit = (bookmarkId) => {
    dispatch(setBookmarkEditId(bookmarkId));
  };

  const onDelete = (bookmarkId) => {
    dispatch(setBookmarkDeleteId(bookmarkId));
  };

  return (
    <div className={`bookmark bookmark_${color}`}>
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
      <EditButton onClick={() => onEdit(id)} className="bookmark" />
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

BookmarkItem.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default BookmarkItem;
