import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { useField } from 'react-final-form';

const Input = forwardRef(({
  name, placeholder, className, onFocus, onChange, onBlur,
}, ref) => {
  const { input, meta } = useField(name);

  const onInputFocus = (e) => {
    onFocus(e);
    input.onFocus(e);
  };

  const onInputChange = (e) => {
    onChange(e);
    input.onChange(e);
  };

  const onInputBlur = (e) => {
    onBlur(e);
    input.onBlur(e);
  };

  return (
    <div className={`input input_${className}`}>
      <div className={cs('input__placeholder', { input__placeholder_empty: !input.value })}>
        {placeholder}
      </div>
      <input
        className="input__value"
        ref={ref}
        name={name}
        value={input.value}
        onFocus={onInputFocus}
        onChange={onInputChange}
        onBlur={onInputBlur}
      />
      <div className={cs('input__error', { input__error_show: meta.touched && meta.error })}>{meta.error}</div>
    </div>
  );
});

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  className: '',
  placeholder: '',
  onFocus: () => {},
  onChange: () => {},
  onBlur: () => {},
};

export default Input;
