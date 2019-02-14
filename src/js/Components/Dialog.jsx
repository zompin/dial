import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from './Popup';
import ButtonDefault from './ButtonDefault';
import { hideDialog } from '../Actions/Popup';

const Dialog = ({
  show,
  onClose,
  onAccept,
  message,
}) => (
  <Popup show={show} onClose={onClose}>
    <div>{message}</div>
    <ButtonDefault className="button-default_popup" onClick={() => { onAccept(); onClose(); }} primary>
      Удалить
    </ButtonDefault>
    <ButtonDefault className="button-default_popup" onClick={onClose}>
      Отмена
    </ButtonDefault>
  </Popup>
);

Dialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { isDialogVisible, dialogAcceptCallback, dialogMessage } = state.Popup;

  return {
    show: isDialogVisible,
    onAccept: dialogAcceptCallback,
    message: dialogMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(hideDialog()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
