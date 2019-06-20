import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from './Popup';
import Input from './Input';
import Button from './ButtonDefault';
import { hidePopupAction } from '../Actions/Popup';
import { updateBookmarkAction } from '../Actions/Bookmarks';
import { getLocaleMessage } from '../utils';

class EditPopup extends Component {
  state = {
    url: '',
    title: '',
    id: '',
  };

  componentDidUpdate(prevProps) {
    const { payload } = this.props;
    const prevPayload = prevProps.payload;

    if (!prevPayload.edit && payload.edit) {
      this.setBookmark(payload.edit.id);
    }
  }

  setBookmark = (id) => {
    const { bookmarks } = this.props;
    const bookmarkForEdit = bookmarks.find(b => b.id === id);

    if (!bookmarkForEdit) {
      return;
    }

    this.setState({
      url: bookmarkForEdit.url,
      title: bookmarkForEdit.title,
      id: bookmarkForEdit.id,
    });
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onEdit = () => {
    const { updateBookmark, hidePopup } = this.props;
    const { id, url, title } = this.state;

    updateBookmark(id, url, title);
    hidePopup('edit');
  };

  render() {
    const { onChange, onEdit } = this;
    const { show, hidePopup } = this.props;
    const { url, title } = this.state;

    return (
      <Popup name="edit" onClose={() => hidePopup('edit')}>
        <div className="popup__header">
          {getLocaleMessage('editBookmark')}
        </div>
        <Input
          name="url"
          value={url}
          onChange={onChange}
          placeholder={getLocaleMessage('url')}
          className="popup"
          focus={show}
        />
        <Input
          name="title"
          value={title}
          onChange={onChange}
          placeholder={getLocaleMessage('title')}
          className="popup"
        />
        <Button onClick={onEdit} primary>
          {getLocaleMessage('save')}
        </Button>
      </Popup>
    );
  }
}

EditPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  updateBookmark: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  payload: PropTypes.shape().isRequired,
  bookmarks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

function mapStateToProps(state) {
  return {
    show: state.Popup.show.edit || false,
    payload: state.Popup.payload || {},
    bookmarks: state.Bookmarks.bookmarks,
  };
}

export default connect(mapStateToProps, {
  updateBookmark: updateBookmarkAction,
  hidePopup: hidePopupAction,
})(EditPopup);
