import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';

const Dialog = ({
  show,
  onClose,
  onAccept,
  message,
}) => (
  <Popup show={show} onClose={onClose}>
    <div>{message}</div>
    <button onClick={() => { onAccept(); onClose(); }}>ок</button>
    <button onClick={onClose}>отмена</button>
  </Popup>
);

Dialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default Dialog;
