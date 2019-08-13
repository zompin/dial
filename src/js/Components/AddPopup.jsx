import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from './Popup';
import Input from './Input';
import ComboBox from './ComboBox';
import Button from './ButtonDefault';
import { getHistory } from '../Actions/History';
import { addBookmarkAction } from '../Actions/Bookmarks';
import { hidePopupAction, disableCloseAction, enableCloseAction } from '../Actions/Popup';
import { getLocaleMessage } from '../utils';

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
    const { onAdd, hidePopup } = this.props;
    const { url, title } = this.state;

    onAdd(url, title);
    hidePopup('add');

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
      disableClose,
      enableClose,
    } = this.props;
    const onEnableClose = () => setTimeout(enableClose, 100);

    return (
      <Popup name="add">
        <div className="popup__header">{getLocaleMessage('addBookmark')}</div>
        <ComboBox
          name="url"
          value={url}
          placeholder={getLocaleMessage('url')}
          onInputChange={onChange}
          items={showComboBox ? history : []}
          onComboItemSelect={onComboSelect}
          className="popup"
          focus={show}
          onShow={disableClose}
          onHide={onEnableClose}
        />
        <Input
          name="title"
          value={title}
          onChange={onChange}
          placeholder={getLocaleMessage('title')}
          className="popup"
        />
        <Button onClick={onAdd} primary>{getLocaleMessage('add')}</Button>
      </Popup>
    );
  }
}

AddPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getHistory: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  enableClose: PropTypes.func.isRequired,
  disableClose: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    show: state.Popup.show.add || false,
    history: state.History.history,
  };
}

export default connect(mapStateToProps, {
  getHistory,
  onAdd: addBookmarkAction,
  hidePopup: hidePopupAction,
  enableClose: enableCloseAction,
  disableClose: disableCloseAction,
})(AddPopup);
