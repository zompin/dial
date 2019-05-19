import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const ButtonDefault = ({
  className,
  onClick,
  children,
  primary,
}) => (
  <button
    type="button"
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
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,

  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

ButtonDefault.defaultProps = {
  className: '',
  primary: false,
};

export default ButtonDefault;
