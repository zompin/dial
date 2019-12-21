import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  componentWillReceiveProps(nextProps) {
    const { focus } = this.props;

    if (!focus && nextProps.focus) {
      setTimeout(() => this.input.focus(), 500);
    }
  }

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
    const placeHolderClasslist = ['input__placeholder'];

    if (!value) {
      placeHolderClasslist.push('input__placeholder_empty');
    }

    return (
      <div className={`input input_${className}`}>
        <div className={placeHolderClasslist.join(' ')}>{placeholder}</div>
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
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  focus: PropTypes.bool,
  onFocus: PropTypes.func,
};

Input.defaultProps = {
  value: '',
  className: '',
  focus: false,
  onFocus: null,
};

export default Input;