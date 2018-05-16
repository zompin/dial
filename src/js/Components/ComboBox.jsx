import React, { Component } from 'react';
import Input from './Input';

class ComboBox extends Component {
  state = {
    isComboListVisible: false,
  };
  onKeyDown = () => {

  };

  onComboSelect = (e) => {
    console.log(e)
  };

  render() {
    const { name, value, placeholder, onInputChange, items } = this.props;

    return (
      <div className="combobox">
        <Input name={name} value={value} placeholder={placeholder} onChange={onInputChange} />

        <div className="combobox__list">
          {
            items.map(i => (
              <div className="combobox-item" key={i.id} data-id={i.id} onClick={this.onComboSelect}>
                {i.url} - {i.title}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default ComboBox;
