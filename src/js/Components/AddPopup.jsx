import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from './Popup';
import Input from './Input';
import ComboBox from './ComboBox';
import Button from './ButtonDefault';
import { hideAddPopup, disableClose, enableClose } from '../Actions/Popup';
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
      onChange,
      onComboSelect,
      onAdd,
    } = this;
    const { title, url, showComboBox } = this.state;
    const {
      show,
      history,
      onClose,
      disable,
      enable,
    } = this.props;

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
          focus={show}
          onShow={disable}
          onHide={enable}
        />
        <Input
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Title"
          className="popup"
        />
        <Button onClick={onAdd} primary>Добавить</Button>
      </Popup>
    );
  }
}

AddPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  folder: PropTypes.shape(),
  getHistory: PropTypes.func.isRequired,
};

AddPopup.defaultProps = {
  folder: {},
};

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
    disable: () => dispatch(disableClose()),
    enable: () => dispatch(enableClose()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPopup);
