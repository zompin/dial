import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import cs from 'classnames';
import XButton from './XButton';

const Popup = ({ children, isOpen, onClose }) => {
  const onPopupClose = () => {
    onClose();
  };

  const onEsc = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return createPortal(
    <div className={cs('popup', { popup_hidden: !isOpen })}>
      <div className="popup__cover" onClick={onPopupClose} />
      <div className="popup__inner">
        <XButton onClick={onPopupClose} action="close" className="popup" />
        {children}
      </div>
    </div>,
    document.body,
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
