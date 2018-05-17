import React, { Component } from 'react';
import Input from './Input';

class ComboBox extends Component {
  state = {
    isComboListVisible: false,
  };
  onKeyDown = () => {

  };

  onComboSelect = (e) => {
    const { onComboItemSelect } = this.props;
    const { id } = e.currentTarget.dataset;

    if (onComboItemSelect) {
      onComboItemSelect(id);
    }
  };

  render() {
    const { name, value, placeholder, onInputChange, items, className } = this.props;

    return (
      <div className={`combobox combobox_${className}`}>
        <Input name={name} value={value} placeholder={placeholder} onChange={onInputChange} />

        <div className="combobox__list">
          {
            items.map(i => (
              <div className="combobox-item" key={i.id} data-id={i.id} onClick={this.onComboSelect}>
                <div className="combobox-item__url">{i.url}</div>
                <div className="combobox-item__title">{i.title}</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default ComboBox;
