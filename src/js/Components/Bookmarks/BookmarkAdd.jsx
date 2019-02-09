import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAddPopup } from '../../Actions/Popup';

const BookmarkAdd = ({ onAdd }) => (
  <button className="bookmark-add" onClick={onAdd}>
    <div className="bookmark-add__l bookmark-add__l_1" />
    <div className="bookmark-add__l bookmark-add__l_2" />
  </button>
);

BookmarkAdd.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onAdd: () => dispatch(showAddPopup()),
  };
}

export default connect(null, mapDispatchToProps)(BookmarkAdd);
