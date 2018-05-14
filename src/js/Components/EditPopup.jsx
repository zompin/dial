import React from 'react';
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

export default EditPopup;
