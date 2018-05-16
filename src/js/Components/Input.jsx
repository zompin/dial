import React, { Component } from 'react';

class Input extends Component {
  onChange = (e) => {
    const {onChange, name} = this.props;
    const {value} = e.target;

    onChange(name, value);
  };

  render() {
    const {value, placeholder, name, className, onKeyDown} = this.props;
    const placeHolderClasslist = ['input__placeholder'];

    if (!value) {
      placeHolderClasslist.push('input__placeholder_empty');
    }

    return (
      <div className={`input input_${className}`}>
        <div className={placeHolderClasslist.join(' ')}>{placeholder}</div>
        <input className="input__value" value={value || ''} name={name} onChange={this.onChange} onKeyDown={onKeyDown} />
      </div>
    );
  }
}

export default Input;
