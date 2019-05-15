import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import BookmarksList from './Components/Bookmarks/BookmarksList';
import AddPopup from './Components/AddPopup';
import EditPopup from './Components/EditPopup';
import Dialog from './Components/Dialog';
import Preloader from './Components/Preloader';
import SlideCheckbox from './Components/SlideCheckbox';
import { getBookmarks, toggleBookmarks } from './Actions/Bookmarks';
import { getStorage } from './Actions/Storage';

class App extends Component {
  componentDidMount() {
    const { getBookmarks, getStorage } = this.props;
    getBookmarks();
    getStorage();
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
        <Dialog />
      </div>
    );
  }
}

App.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  getBookmarks: PropTypes.func.isRequired,
  toggleEditable: PropTypes.func.isRequired,
  getStorage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isEditable: state.Bookmarks.isBookmarksEditable,
    storage: state.Storage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBookmarks: () => dispatch(getBookmarks()),
    toggleEditable: () => dispatch(toggleBookmarks()),
    getStorage: () => dispatch(getStorage()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(hot(App));
