import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from './Input';

class ComboBox extends Component {
  popupOpenFlag = false;

  state = {
    open: false,
  };

  componentDidMount() {
    const { outsideClick, onEsc } = this;

    document.addEventListener('click', outsideClick);
    document.addEventListener('keydown', onEsc);
  }

  componentDidUpdate() {
    const {
      items,
      onHide,
      onShow,
    } = this.props;
    const { open } = this.state;
    const popupOpenFlagCurrent = open && !!items.length;

    if (popupOpenFlagCurrent === this.popupOpenFlag) {
      return;
    }

    if (onHide && !popupOpenFlagCurrent) {
      onHide();
    }

    if (onShow && popupOpenFlagCurrent) {
      onShow();
    }

    this.popupOpenFlag = popupOpenFlagCurrent;
  }

  componentWillUnmount() {
    const { outsideClick, onEsc } = this;

    document.removeEventListener('click', outsideClick);
    document.removeEventListener('onkeydown', onEsc);
  }

  onComboSelect = (e) => {
    const { onComboItemSelect } = this.props;
    const { id } = e.currentTarget.dataset;

    if (onComboItemSelect) {
      onComboItemSelect(id);
    }
  };

  onFocus = () => {
    const { onShow } = this;

    onShow();
  };

  outsideClick = (e) => {
    const { combobox, onHide } = this;

    if (!combobox.contains(e.target)) {
      onHide();
    }
  };

  onShow = () => {
    this.setState({
      open: true,
    });
  };

  onHide = () => {
    this.setState({
      open: false,
    });
  };

  onEsc = (e) => {
    const { onHide } = this;

    if (e.keyCode === 27) {
      onHide();
    }
  };

  onInputChange = (value) => {
    const { show } = this.state;
    const { onInputChange } = this.props;
    const { onShow } = this;

    onInputChange(value);

    if (!show) {
      onShow();
    }
  };

  render() {
    const {
      name,
      placeholder,
      items,
      className,
      focus,
    } = this.props;
    const { open } = this.state;
    const { onFocus, onComboSelect, onInputChange } = this;

    return (
      <div className={`combobox combobox_${className}`} ref={(e) => { this.combobox = e; }}>
        <Input
          name={name}
          placeholder={placeholder}
          onChange={onInputChange}
          onFocus={onFocus}
          focus={focus}
        />

        <div
          className={cs('combobox__list', { combobox__list_open: open })}
        >
          {
            items.map((i) => (
              <div className="combobox-item" key={i.id} data-id={i.id} onClick={onComboSelect}>
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
  placeholder: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
  onComboItemSelect: PropTypes.func.isRequired,
  focus: PropTypes.bool,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
};

ComboBox.defaultProps = {
  className: '',
  focus: false,
  onShow: null,
  onHide: null,
};

export default ComboBox;
