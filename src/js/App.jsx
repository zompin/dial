import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookmarksList from './Components/Bookmarks/BookmarksList';
import AddPopup from './Components/AddPopup';
import EditPopup from './Components/EditPopup';
import Dialog from './Components/Dialog';
import Preloader from './Components/Preloader';
import SlideCheckbox from './Components/SlideCheckbox';
import { getBookmarks, toggleBookmarks } from './Actions/Bookmarks';

class App extends Component {
  componentDidMount() {
    this.props.getBookmarks();
  }

  render() {
    const { isEditable, toggleBookmarks } = this.props;

    return (
      <div>
        <SlideCheckbox name="isEditable" checked={isEditable} onChange={toggleBookmarks} />
        <Preloader />
        <BookmarksList />
        <AddPopup />
        <EditPopup />
        <Dialog />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isEditable: state.Bookmarks.isBookmarksEditable,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBookmarks: () => dispatch(getBookmarks()),
    toggleBookmarks: () => dispatch({ type: 'BOOKMARKS_TOGGLE' }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
