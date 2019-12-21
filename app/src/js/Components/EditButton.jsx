import React from 'react';
import PropTypes from 'prop-types';

const EditButton = ({ onClick, className }) => (
  <button onClick={onClick} className={`edit-button edit-button_${className}`}>
    <div className="edit-button__l edit-button__l_1" />
    <div className="edit-button__l edit-button__l_2" />
    <div className="edit-button__l edit-button__l_3" />
  </button>
);

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

EditButton.defaultProps = {
  className: '',
};

export default EditButton;
