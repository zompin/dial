import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from './Popup';
import Input from './Input';
import ComboBox from './ComboBox';
import { hideAddPopup } from '../Actions/Popup';
import { getHistory } from '../Actions/History';
import { addBookmark } from '../Actions/Bookmarks';

class AddPopup extends Component {
  state = {
    url: '',
    title: '',
    showComboBox: false,
  };

  onChange = (name, value) => {
    const { getHistory } = this.props;

    this.setState({
      [name]: value,
    });

    if (name === 'url') {
      getHistory(value);
      this.setState({
        showComboBox: true,
      });
    }
  };

  onAdd = () => {
    const { onAdd, folder, onClose } = this.props;
    const { url, title } = this.state;

    onAdd(url, title, folder);
    onClose();

    this.setState({
      url: '',
      title: '',
    });
  };

  onComboSelect = (id) => {
    const { history } = this.props;
    const item = history.find(i => i.id === id);

    if (item) {
      this.setState({
        url: item.url,
        title: item.title,
        showComboBox: false,
      });
    }
  };

  render() {
    const {
      props,
      state,
      onChange,
      onComboSelect,
      onAdd,
    } = this;
    const { show, history, onClose } = props;
    const { title, url, showComboBox } = state;

    return (
      <Popup show={show} onClose={onClose}>
        <div className="popup__header">Добавить вкладку</div>
        <ComboBox
          name="url"
          value={url}
          placeholder="URL"
          onInputChange={onChange}
          items={showComboBox ? history : []}
          onComboItemSelect={onComboSelect}
          className="popup"
        />
        <Input
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Title"
          className="popup"
        />
        <button onClick={onAdd}>+</button>
      </Popup>
    );
  }
}

// AddPopup.propTypes = {
//   show: PropTypes.bool,
//   onClose: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   values: PropTypes.shape().isRequired,
//   onAdd: PropTypes.func.isRequired,
//   historyItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,
// };
//
// AddPopup.defaultProps = {
//   show: false,
// };

function mapStateToProps(state) {
  return {
    show: state.Popup.isAddPopupVisible,
    folder: state.Bookmarks.bookmarksFolder,
    history: state.History.history,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(hideAddPopup()),
    getHistory: text => dispatch(getHistory(text)),
    onAdd: (url, title, folder) => dispatch(addBookmark(url, title, folder.id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPopup);
