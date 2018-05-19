import React from 'react';
import PropTypes from 'prop-types';
import XButton from '../XButton';
import EditButton from '../EditButton';

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
      <EditButton onClick={onEdit} className="bookmark" />
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
