import React from 'react';

const XButton = ({ onClick, className, action }) => (
    <button className={`x-button x-button_${className}`} onClick={onClick} data-action={action}>
        <div className="x-button__l x-button__l_1" />
        <div className="x-button__l x-button__l_2" />
    </button>
);

export default XButton;
