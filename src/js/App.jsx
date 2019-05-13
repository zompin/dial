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
import { ctrlDownAction, ctrlUpAction } from './Actions/App';

class App extends Component {
  componentDidMount() {
    const { getBookmarks, getStorage } = this.props;
    const { onKeyDown, onKeyUp } = this;
    getBookmarks();
    getStorage();

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }

  componentWillUnmount() {
    const { onKeyDown, onKeyUp } = this;

    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
  }

  onKeyDown = ({ key }) => {
    const { ctrlDown } = this.props;

    if (key === 'Control') {
      ctrlDown();
    }
  };

  onKeyUp = ({ key }) => {
    const { ctrlUp } = this.props;

    if (key === 'Control') {
      ctrlUp();
    }
  };

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
    ctrlDown: () => dispatch(ctrlDownAction()),
    ctrlUp: () => dispatch(ctrlUpAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(hot(App));
