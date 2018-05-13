import React from 'react';
import PlusButton from './PlusButton';

const ControlPanel = ({ onAdd }) => (
    <div className="control-panel">
        <PlusButton onClick={onAdd} />
    </div>
);

export default ControlPanel;
