import React from 'react';

const XButton = ({ onClick, className }) => (
    <button className={`x-button x-button_${className}`} onClick={onClick}>
        <div className="x-button__l x-button__l_1" />
        <div className="x-button__l x-button__l_2" />
    </button>
);

export default XButton;
