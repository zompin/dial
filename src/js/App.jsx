import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import BookmarksList from './Components/Bookmarks/BookmarksList';
import AddPopup from './Components/AddPopup';
import EditPopup from './Components/EditPopup';
import Preloader from './Components/Preloader';
import SlideCheckbox from './Components/SlideCheckbox';
import { getBookmarksAction, toggleBookmarksAction } from './Actions/Bookmarks';

class App extends Component {
  componentDidMount() {
    const { getBookmarks } = this.props;
    getBookmarks();
  }

  render() {
    const { isEditable, toggleEditable } = this.props;

    return (
      <div>
        <SlideCheckbox name="isEditable" checked={isEditable} onChange={toggleEditable} />
        <Preloader />
        <BookmarksList />
        <AddPopup />
        <EditPopup />
      </div>
    );
  }
}

App.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  getBookmarks: PropTypes.func.isRequired,
  toggleEditable: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isEditable: state.Bookmarks.isBookmarksEditable,
    storage: state.Storage,
  };
}

export default connect(mapStateToProps, {
  getBookmarks: getBookmarksAction,
  toggleEditable: toggleBookmarksAction,
})(hot(App));
