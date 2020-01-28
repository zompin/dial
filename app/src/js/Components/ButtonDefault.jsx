import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const ButtonDefault = ({
  className,
  onClick,
  children,
  primary,
  type,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={cs(`button-default ${className}`, {
      'button-default_primary': primary,
    })}
  >
    {children}
  </button>
);

ButtonDefault.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

ButtonDefault.defaultProps = {
  className: '',
  primary: false,
  type: 'button',
  onClick: () => {},
};

export default ButtonDefault;
