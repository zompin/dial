import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showPopupAction } from '../../Actions/Popup';

const BookmarkAdd = ({ showPopup }) => (
  <button className="bookmark-add" onClick={() => showPopup('add')}>
    <div className="bookmark-add__l bookmark-add__l_1" />
    <div className="bookmark-add__l bookmark-add__l_2" />
  </button>
);

BookmarkAdd.propTypes = {
  showPopup: PropTypes.func.isRequired,
};

export default connect(null, { showPopup: showPopupAction })(BookmarkAdd);
