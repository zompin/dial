import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

class ComboBox extends Component {
  onComboSelect = (e) => {
    const { onComboItemSelect } = this.props;
    const { id } = e.currentTarget.dataset;

    if (onComboItemSelect) {
      onComboItemSelect(id);
    }
  };

  render() {
    const {
      name,
      value,
      placeholder,
      onInputChange,
      items,
      className,
      focus,
    } = this.props;

    return (
      <div className={`combobox combobox_${className}`}>
        <Input
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onInputChange}
          focus={focus}
        />

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

ComboBox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
  onComboItemSelect: PropTypes.func.isRequired,
  focus: PropTypes.bool,
};

ComboBox.defaultProps = {
  value: '',
  className: '',
  focus: false,
};

export default ComboBox;
