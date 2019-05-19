import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from './Popup';
import ButtonDefault from './ButtonDefault';
import { hidePopupAction } from '../Actions/Popup';
import { getLocaleMessage } from '../utils';

const Dialog = ({
  onClose,
  onAccept,
  message,
}) => (
  <Popup name="dialog" onClose={onClose}>
    <div>{message}</div>
    <ButtonDefault className="button-default_popup" onClick={() => { onAccept(); onClose(); }} primary>
      {getLocaleMessage('delete')}
    </ButtonDefault>
    <ButtonDefault className="button-default_popup" onClick={onClose}>
      {getLocaleMessage('cancel')}
    </ButtonDefault>
  </Popup>
);

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { dialogAcceptCallback, dialogMessage } = state.Popup;

  return {
    onAccept: dialogAcceptCallback,
    message: dialogMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(hidePopupAction('dialog')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
