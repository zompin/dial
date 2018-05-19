import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import XButton from './XButton';

class Popup extends Component {
  componentWillMount() {
    document.addEventListener('keydown', this.onEsc, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
  }

  onEsc = (e) => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  close = (e) => {
    if (e.target.dataset.action === 'close') {
      this.props.onClose();
    }
  };

  render() {
    const { children, show } = this.props;

    return (
      <div className={cs('popup', { popup_hidden: !show })} onClick={this.close} data-action="close">
        <div className="popup__inner">
          <XButton onClick={this.close} action="close" className="popup" />
          {children}
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
