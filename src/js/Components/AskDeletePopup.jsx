import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import { getLocaleMessage } from '../utils';
import ButtonDefault from './ButtonDefault';

const AskDeletePopup = ({ onDelete, onCancel }) => (
  <Popup name="ask-delete">
    <div>
      {getLocaleMessage('removeBookmarkQuestions')}
    </div>
    <ButtonDefault className="button-default_popup" onClick={onDelete} primary>
      {getLocaleMessage('delete')}
    </ButtonDefault>
    <ButtonDefault className="button-default_popup" onClick={onCancel}>
      {getLocaleMessage('cancel')}
    </ButtonDefault>
  </Popup>
);

AskDeletePopup.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AskDeletePopup;
