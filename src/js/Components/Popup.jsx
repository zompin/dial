import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cs from 'classnames';
import XButton from './XButton';
import { hidePopupAction } from '../Actions/Popup';

const modals = document.createElement('div');
modals.id = 'modals';
document.body.appendChild(modals);

class Popup extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEsc);
    modals.appendChild(this.el);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
    modals.removeChild(this.el);
  }

  onEsc = (e) => {
    if (e.keyCode === 27) {
      this.close();
    }
  };

  close = () => {
    const { name, hidePopup } = this.props;

    hidePopup(name);
  };

  coverClick = ({ target }) => {
    const { onClose } = this.props;

    if (!target.dataset || !target.dataset.action) {
      return;
    }

    if (target.dataset.action !== 'close') {
      return;
    }

    if (onClose) {
      onClose();
    }

    this.close();
  };

  render() {
    const { children, show, name } = this.props;

    return createPortal(
      <div
        onClick={this.coverClick}
        className={cs('popup', { popup_hidden: !show[name] })}
        data-action="close"
      >
        <div className="popup__inner">
          <XButton onClick={this.close} action="close" className="popup" />
          {children}
        </div>
      </div>,
      this.el,
    );
  }
}

Popup.propTypes = {
  show: PropTypes.shape().isRequired,
  hidePopup: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onClose: PropTypes.func,
};

Popup.defaultProps = {
  onClose: null,
};

const mapStateToProps = state => ({
  show: state.Popup.show,
});

export default connect(mapStateToProps, { hidePopup: hidePopupAction })(Popup);
