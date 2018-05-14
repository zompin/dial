import React from 'react';
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
        <Input name="url_add" value={values.url_add} onChange={onChange} placeholder="URL" />
        <Input name="title_add" value={values.title_add} onChange={onChange} placeholder="Title" />
        <button onClick={onAdd}>+</button>
    </Popup>
);

export default AddPopup;
