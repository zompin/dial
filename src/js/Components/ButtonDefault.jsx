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
  children: PropTypes.element.isRequired,
  primary: PropTypes.bool,
};

ButtonDefault.defaultProps = {
  className: '',
  primary: false,
};

export default ButtonDefault;
