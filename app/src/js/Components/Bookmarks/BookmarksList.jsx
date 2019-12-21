import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import BookmarksItem from './BookmarkItem';
import BookmarkAdd from './BookmarkAdd';
import AskDeletePopup from '../AskDeletePopup';
import { removeBookmarkAction } from '../../Actions/Bookmarks';
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
    // browser.commands.onCommand.addListener(this.numberPress);
  }

  componentWillUnmount() {
    commands.onCommand.removeListener(this.numberPress);
    // browser.commands.onCommand.removeListener(this.numberPress);
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
    const {
      bookmarks,
      currentProfile,
    } = this.props;
    const getColor = colorGenerator();
    const { showDeletePopup, onDelete, onCancel } = this;
    const groupedBookmarks = bookmarks.map((g) => (
      <div
        key={g.parentId}
        className={cs('bookmarks', {
          bookmarks_show: currentProfile.id === g.parentId,
        })}
      >
        {
          g.items.map((b, i) => (
            <BookmarksItem
              key={b.id}
              id={b.id}
              url={b.url}
              title={b.title}
              color={getColor(b.url)}
              index={i}
              onDelete={showDeletePopup}
            />
          ))
        }
        <BookmarkAdd />
      </div>
    ));

    return (
      <>
        {groupedBookmarks}
        <AskDeletePopup onDelete={onDelete} onCancel={onCancel} />
      </>
    );
  }
}

BookmarksList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  showPopup: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  removeBookmark: PropTypes.func.isRequired,
  currentProfile: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    bookmarks: state.Bookmarks.bookmarks,
    isLoaded: state.Bookmarks.isBookmarksLoaded,
    profiles: state.Profiles.data,
    currentProfile: state.Profiles.current,
  };
}

export default connect(mapStateToProps, {
  removeBookmark: removeBookmarkAction,
  hidePopup: hidePopupAction,
  showPopup: showPopupAction,
})(BookmarksList);
