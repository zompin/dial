import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from './Popup';
import Input from './Input';
import ComboBox from './ComboBox';
import { hideAddPopup } from '../Actions/Popup';

const AddPopup = ({
  show,
  onClose,
  values,
  onChange,
  historyItems,
  onComboItemSelect,
  onAdd,
}) => (
  <Popup show={show} onClose={onClose}>
    <div className="popup__header">Добавить вкладку</div>
    <ComboBox
      name="url_add"
      value={values.url_add}
      placeholder="URL"
      onInputChange={onChange}
      items={historyItems}
      onComboItemSelect={onComboItemSelect}
      className="popup"
    />
    <Input
      name="title_add"
      value={values.title_add}
      onChange={onChange}
      placeholder="Title"
      className="popup"
    />
    <button onClick={onAdd}>+</button>
  </Popup>
);

AddPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired,
  onAdd: PropTypes.func.isRequired,
  historyItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onComboItemSelect: PropTypes.func.isRequired,
};

AddPopup.defaultProps = {
  show: false,
};

function mapStateToProps(state) {
  return {
    show: state.Popup.isAddPopupVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(hideAddPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPopup);
