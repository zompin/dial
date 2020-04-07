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

export default Popup;
