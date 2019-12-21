import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import BookmarksList from './Components/Bookmarks/BookmarksList';
import AddPopup from './Components/AddPopup';
import EditPopup from './Components/EditPopup';
import Preloader from './Components/Preloader';
import Profiles from './Components/Profiles';
import { getBookmarksAction } from './Actions/Bookmarks';

class App extends Component {
  componentDidMount() {
    const { getBookmarks } = this.props;
    getBookmarks();
  }

  render() {
    return (
      <div>
        <Preloader />
        <Profiles />
        <BookmarksList />
        <AddPopup />
        <EditPopup />
      </div>
    );
  }
}

App.propTypes = {
  getBookmarks: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    storage: state.Storage,
  };
}

export default connect(mapStateToProps, {
  getBookmarks: getBookmarksAction,
})(hot(App));
