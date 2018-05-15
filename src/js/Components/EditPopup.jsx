import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import Input from './Input';

const EditPopup = ({
  show,
  onClose,
  onChange,
  values,
  onEdit,
}) => (
  <Popup show={show} onClose={onClose}>
    <div className="popup__header">Редактировать</div>
    <Input name="url_edit" value={values.url_edit} onChange={onChange} placeholder="URL" />
    <Input name="title_edit" value={values.title_edit} onChange={onChange} placeholder="Title" />
    <button onClick={onEdit}>edit</button>
  </Popup>
);

EditPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired,
  onEdit: PropTypes.func.isRequired,
};

EditPopup.defaultProps = {
  show: false,
};

export default EditPopup;
