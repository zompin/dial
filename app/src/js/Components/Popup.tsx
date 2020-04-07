import * as React from 'react';
import { createPortal } from 'react-dom';
import cs from 'classnames';
import XButton from './XButton';

interface IProps {
  children: React.ReactElement | Array<React.ReactElement>
  isOpen: boolean
  onClose: () => void
}

const Popup = ({ children, isOpen, onClose }: IProps) => {
  const onPopupClose = () => {
    onClose();
  };

  const onEsc = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onEsc, true);
    return () => {
      document.removeEventListener('keydown', onEsc, true);
    };
  }, []);

  return createPortal(
    <div className="popup">
      <div
        className={cs('popup__cover', { popup__cover_show: isOpen })}
        onClick={onPopupClose}
      />
      <div className={cs('popup__inner', { popup__inner_show: isOpen })}>
        <XButton onClick={onPopupClose} action="close" className="popup" />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Popup;
