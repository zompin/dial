import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from './Popup';
import { hideDialog } from '../Actions/Popup';

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

function mapStateToProps({ Popup }) {
  return {
    show: Popup.isDialogVisible,
    onAccept: Popup.dialogAcceptCallback,
    message: Popup.dialogMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(hideDialog()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
