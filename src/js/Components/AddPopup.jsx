import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import Input from './Input';

const AddPopup = ({
  show,
  onClose,
  onChange,
  values,
  onAdd,
}) => (
  <Popup show={show} onClose={onClose}>
    <div className="popup__header">Добавить вкладку</div>
    <Input name="url_add" value={values.url_add} onChange={onChange} placeholder="URL" className="popup" />
    <Input name="title_add" value={values.title_add} onChange={onChange} placeholder="Title" className="popup" />
    <button onClick={onAdd}>+</button>
  </Popup>
);

AddPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired,
  onAdd: PropTypes.func.isRequired,
};

AddPopup.defaultProps = {
  show: false,
};

export default AddPopup;
