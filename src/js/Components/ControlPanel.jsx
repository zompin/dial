import React from 'react';
import PropTypes from 'prop-types';
import PlusButton from './PlusButton';

const ControlPanel = ({ onAdd }) => (
  <div className="control-panel">
    <PlusButton onClick={onAdd} />
  </div>
);

ControlPanel.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default ControlPanel;
