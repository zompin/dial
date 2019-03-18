import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookmarksItem from './BookmarkItem';
import BookmarkAdd from './BookmarkAdd';
import { toggleBookmarks } from '../../Actions/Bookmarks';

class BookmarksList extends Component {
  componentDidUpdate(prevProps) {
    const {
      isEditable,
      isLoaded,
      bookmarks,
      toggleBookmarks,
    } = this.props;

    if (isLoaded && !prevProps.isLoaded && !isEditable && !bookmarks.length) {
      toggleBookmarks();
    }
  }

  render() {
    const { bookmarks, isEditable } = this.props;

    return (
      <div className="bookmarks">
        {
          bookmarks.map(b => (
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
          isEditable && <BookmarkAdd />
        }
      </div>
    );
  }
}

BookmarksList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isEditable: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  toggleBookmarks: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    bookmarks: state.Bookmarks.bookmarks,
    isEditable: state.Bookmarks.isBookmarksEditable,
    isLoaded: state.Bookmarks.isBookmarksLoaded,
  };
}

export default connect(mapStateToProps, { toggleBookmarks })(BookmarksList);
