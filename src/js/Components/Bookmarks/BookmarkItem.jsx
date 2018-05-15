import React from 'react';
import PropTypes from 'prop-types';
import XButton from '../XButton';

const BookmarkItem = ({
  url,
  title,
  onDelete,
  onEdit,
}) => (
  <div className="bookmark">
    <div className="bookmark__inner">
      <div className="bookmark__title">
        {title}
      </div>
      <div className="bookmark__url">{url}</div>
      <a className="bookmark__link" href={url} />
      <XButton onClick={onDelete} className="bookmark" />
      <button className="bookmark__edit" onClick={onEdit}>
        edit
      </button>
    </div>
  </div>
);

BookmarkItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default BookmarkItem;
