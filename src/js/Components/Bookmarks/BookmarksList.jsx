import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookmarksItem from './BookmarkItem';
import BookmarkAdd from './BookmarkAdd';
import AskDeletePopup from '../AskDeletePopup';
import { toggleBookmarksAction, removeBookmarkAction } from '../../Actions/Bookmarks';
import { hidePopupAction, showPopupAction } from '../../Actions/Popup';
import { commands } from '../../utils';

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
  state = {
    bookmarkForDelete: '',
  };

  componentDidMount() {
    commands.onCommand.addListener(this.numberPress);
  }

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

  componentWillUnmount() {
    commands.onCommand.removeListener(this.numberPress);
  }

  numberPress = (command) => {
    const { bookmarks } = this.props;

    if (command.indexOf('-') === -1) {
      return;
    }

    const pieces = command.split('-');
    const numberString = pieces[1];

    if (!numberString) {
      return;
    }

    let number = +numberString;

    if (typeof number !== 'number') {
      return;
    }

    if (number === 0) {
      number = 9;
    } else {
      number -= 1;
    }


    if (!bookmarks[number] || !bookmarks[number].url) {
      return;
    }

    location.href = bookmarks[number].url;
  };

  showDeletePopup = (bookmarkForDelete) => {
    const { showPopup } = this.props;

    showPopup('ask-delete');

    this.setState({
      bookmarkForDelete,
    });
  };

  onDelete = () => {
    const { hidePopup, removeBookmark } = this.props;
    const { bookmarkForDelete } = this.state;

    hidePopup('ask-delete');
    removeBookmark(bookmarkForDelete);

    this.setState({
      bookmarkForDelete: '',
    });
  };

  onCancel = () => {
    const { hidePopup } = this.props;

    hidePopup('ask-delete');

    this.setState({
      bookmarkForDelete: '',
    });
  };

  render() {
    const { bookmarks, isEditable } = this.props;
    const getColor = colorGenerator();
    const { showDeletePopup, onDelete, onCancel } = this;

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
              onDelete={showDeletePopup}
            />
          ))
        }
        {
          isEditable && <BookmarkAdd />
        }
        <AskDeletePopup onDelete={onDelete} onCancel={onCancel} />
      </div>
    );
  }
}

BookmarksList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isEditable: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  toggleBookmarks: PropTypes.func.isRequired,
  showPopup: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  removeBookmark: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    bookmarks: state.Bookmarks.bookmarks,
    isEditable: state.Bookmarks.isBookmarksEditable,
    isLoaded: state.Bookmarks.isBookmarksLoaded,
  };
}

export default connect(mapStateToProps, {
  toggleBookmarks: toggleBookmarksAction,
  removeBookmark: removeBookmarkAction,
  hidePopup: hidePopupAction,
  showPopup: showPopupAction,
})(BookmarksList);
