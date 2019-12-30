import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class Input extends Component {
  onChange = (e) => {
    const { onChange, name } = this.props;
    const { value } = e.target;

    onChange(name, value);
  };

  onFocus = (e) => {
    const { onFocus, name } = this.props;

    if (onFocus) {
      onFocus(e, name);
    }
  };

  render() {
    const {
      value,
      placeholder,
      name,
      className,
    } = this.props;

    return (
      <div className={`input input_${className}`}>
        <div className={cs('input__placeholder', { input__placeholder_empty: !value })}>
          {placeholder}
        </div>
        <input
          className="input__value"
          value={value}
          name={name}
          onChange={this.onChange}
          onFocus={this.onFocus}
          ref={(e) => { this.input = e; }}
        />
      </div>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
};

Input.defaultProps = {
  value: '',
  className: '',
  onFocus: null,
  placeholder: '',
};

export default Input;
