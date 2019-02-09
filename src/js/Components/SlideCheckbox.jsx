import React from 'react';
import PropTypes from 'prop-types';

const SlideCheckbox = ({
  checked,
  onChange,
  name,
  className,
}) => (
  <div className={`slide-checkbox slide-checkbox_${className}`}>
    <input className="slide-checkbox__input" type="checkbox" checked={checked} onChange={() => onChange(name, !checked)} />
    <div className="slide-checkbox__slider" />
  </div>
);

SlideCheckbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SlideCheckbox.defaultProps = {
  checked: false,
  className: '',
};

export default SlideCheckbox;
