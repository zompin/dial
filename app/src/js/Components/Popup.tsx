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
  const [isMounted, setIsMounted] = React.useState(isOpen);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const onPopupClose = () => {
    onClose();
  };

  const onEsc = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    const timer = timerRef.current;

    if (isOpen) {
      setIsMounted(true);
      clearTimeout(timer);
    } else {
      timerRef.current = setTimeout(() => setIsMounted(false), 500);
    }
  }, [isOpen]);

  React.useEffect(() => {
    document.addEventListener('keydown', onEsc, true);
    return () => {
      document.removeEventListener('keydown', onEsc, true);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div className="popup">
      <div
        className={cs('popup__cover', { popup__cover_hide: !isOpen })}
        onClick={onPopupClose}
      />
      <div className={cs('popup__inner', { popup__inner_hide: !isOpen })}>
        <XButton onClick={onPopupClose} action="close" className="popup" />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Popup;
