import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookmarksItem from './BookmarkItem';
import BookmarkAdd from './BookmarkAdd';

const BookmarksList = ({
  bookmarks,
  isEditable,
}) => (
  <div className="bookmarks">
    {
      !!bookmarks.length && bookmarks.map(b => (
        <BookmarksItem
          key={b.id}
          id={b.id}
          url={b.url}
          title={b.title}
          isEditable={isEditable}
        />
      ))
    }
    {
      !!bookmarks.length && isEditable && <BookmarkAdd />
    }
  </div>
);

BookmarksList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isEditable: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    bookmarks: state.Bookmarks.bookmarks,
    isEditable: state.Bookmarks.isBookmarksEditable,
  };
}

export default connect(mapStateToProps)(BookmarksList);
