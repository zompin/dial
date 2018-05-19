import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  onChange = (e) => {
    const { onChange, name } = this.props;
    const { value } = e.target;

    onChange(name, value);
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
        <input className="input__value" value={value} name={name} onChange={this.onChange} />
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
};

Input.defaultProps = {
  value: '',
  className: '',
};

export default Input;
