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
        <div>Добавить вкладку</div>
        <Input name="title_add" value={values.title_add} onChange={onChange} placeholder="Title" />
        <Input name="url_add" value={values.url_add} onChange={onChange} placeholder="URL" />
        <button onClick={onAdd}>+</button>
    </Popup>
);

export default AddPopup;
