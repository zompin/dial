import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import BookmarksItem from './BookmarkItem';
import BookmarkAdd from './BookmarkAdd';
import { toggleBookmarks } from '../../Actions/Bookmarks';

const colorGenerator = () => {
  const colorsStore = [
    '#a83252',
    '#3e4a41',
    '#fe7e18',
    '#41516b',
    '#d41137',
    '#53b0bd',
    '#015e7a',
  ];
  let colorsAcc = [];
  let prevColor = '';

  return (url) => {
    if (colorsAcc.length === 0) {
      colorsAcc = colorsStore.slice();
    }

    let colorIndex = [].reduce.call(
      url,
      (acc, ch) => ch.charCodeAt(0) + acc, 0,
    ) % colorsAcc.length;

    if (prevColor !== '' && prevColor === colorsAcc[colorIndex]) {
      colorIndex -= 1;
    }

    [prevColor] = colorsAcc.splice(colorIndex, 1);

    return prevColor;
  };
};

class BookmarksList extends Component {
  state = { saturate: false };

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

  onEnter = ({ target }) => {
    const bookmark = target.closest('.bookmark');

    if (bookmark) {
      bookmark.classList.add('bookmark_hover');

      this.setState({ saturate: true });
    }
  };

  onLeave = ({ target }) => {
    const bookmark = target.closest('.bookmark');

    if (bookmark) {
      bookmark.classList.remove('bookmark_hover');

      this.setState({ saturate: false });
    }
  };

  render() {
    const { bookmarks, isEditable } = this.props;
    const { onEnter, onLeave } = this;
    const { saturate } = this.state;
    const getColor = colorGenerator();

    return (
      <div
        ref={(e) => { this.list = e; }}
        className={cs('bookmarks', { bookmarks_saturate: saturate })}
      >
        {
          bookmarks.map(b => (
            <BookmarksItem
              key={b.id}
              id={b.id}
              url={b.url}
              title={b.title}
              isEditable={isEditable}
              color={getColor(b.url)}
              onEnter={onEnter}
              onLeave={onLeave}
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
