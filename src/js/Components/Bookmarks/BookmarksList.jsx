import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

  componentDidMount() {
    document.addEventListener('keydown', this.numberPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.numberPress);
  }

  numberPress = ({ key }) => {
    const { bookmarks } = this.props;
    const keyPerformed = +key;

    if (typeof keyPerformed !== 'number') {
      return;
    }

    if (!bookmarks[keyPerformed - 1] || !bookmarks[keyPerformed - 1].url) {
      return;
    }

    location.href = bookmarks[keyPerformed - 1].url;
  };

  render() {
    const { bookmarks, isEditable, ctrl } = this.props;
    const getColor = colorGenerator();

    return (
      <div className="bookmarks">
        {
          bookmarks.map((b, i) => (
            <BookmarksItem
              key={b.id}
              id={b.id}
              url={b.url}
              title={b.title}
              isEditable={isEditable}
              color={getColor(b.url)}
              index={i}
              ctrl={ctrl}
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
  ctrl: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    bookmarks: state.Bookmarks.bookmarks,
    isEditable: state.Bookmarks.isBookmarksEditable,
    isLoaded: state.Bookmarks.isBookmarksLoaded,
    ctrl: state.App.ctrl,
  };
}

export default connect(mapStateToProps, { toggleBookmarks })(BookmarksList);
