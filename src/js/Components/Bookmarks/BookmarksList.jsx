import React from 'react';
import PropTypes from 'prop-types';
import BookmarksItem from './BookmarkItem';
import BookmarkAdd from './BookmarkAdd';

const BookmarksList = ({
  bookmarks,
  onDelete,
  onEdit,
  isEditable,
}) => (
  <div className="bookmarks">
    {
      !!bookmarks.length &&
      bookmarks.map(b => (
        <BookmarksItem
          key={b.id}
          url={b.url}
          title={b.title}
          onDelete={() => onDelete(b.id)}
          onEdit={() => onEdit(b.id)}
          isEditable={isEditable}
        />
        ))
    }
    {
      !!bookmarks.length && isEditable &&
        <BookmarkAdd />
    }
  </div>
);

BookmarksList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
};

export default BookmarksList;
