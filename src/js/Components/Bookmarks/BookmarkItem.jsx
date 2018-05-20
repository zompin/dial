import React from 'react';
import PropTypes from 'prop-types';
import XButton from '../XButton';
import EditButton from '../EditButton';

const BookmarkItem = ({
  url,
  title,
  onDelete,
  onEdit,
}) => {
  const urlPosStart = url.indexOf('//');
  const urlPosEnd = url.indexOf('/', urlPosStart + 2);
  const filteredUrl = url.substring(urlPosStart + 2, urlPosEnd);

  return (
    <div className="bookmark">
      <a className="bookmark__link" href={url}>
        <div className="bookmark__title">
          {title}
        </div>
        <div className="bookmark__url">
          {filteredUrl}
        </div>
      </a>
      <XButton onClick={onDelete} className="bookmark" />
      <EditButton onClick={onEdit} className="bookmark" />
    </div>
  );
};

BookmarkItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default BookmarkItem;
