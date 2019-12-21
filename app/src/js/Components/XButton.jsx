import React from 'react';
import PropsTypes from 'prop-types';

const XButton = ({ onClick, className, action }) => (
  <button className={`x-button x-button_${className}`} onClick={onClick} data-action={action}>
    <div className="x-button__l x-button__l_1" />
    <div className="x-button__l x-button__l_2" />
  </button>
);

XButton.propTypes = {
  onClick: PropsTypes.func.isRequired,
  className: PropsTypes.string,
  action: PropsTypes.string,
};

XButton.defaultProps = {
  className: '',
  action: '',
};

export default XButton;
