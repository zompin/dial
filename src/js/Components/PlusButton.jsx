import React from 'react';
import PropTypes from 'prop-types';

const PlusButton = ({ onClick, className }) => (
  <button className={`plus-button plus-button_${className}`} onClick={onClick}>
    <div className="plus-button__l plus-button__l_1" />
    <div className="plus-button__l plus-button__l_2" />
  </button>
);

PlusButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

PlusButton.defaultProps = {
  className: '',
};

export default PlusButton;
