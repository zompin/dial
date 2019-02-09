import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from './Popup';
import Input from './Input';
import { hideEditPopup } from '../Actions/Popup';
import { updateBookmark, cleanBookmark } from '../Actions/Bookmarks';

class EditPopup extends Component {
  state = {
    url: '',
    title: '',
  };

  componentWillReceiveProps({ bookmark }) {
    const { url, title } = bookmark;

    if (url && title) {
      this.setState({
        url,
        title,
      });
    }
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onEdit = () => {
    const { onEdit, onClose, bookmark: { id } } = this.props;
    const { url, title } = this.state;

    onEdit(id, url, title);
    onClose();
  };

  render() {
    const { onChange, onEdit } = this;
    const { show, onClose } = this.props;
    const { url, title } = this.state;

    return (
      <Popup show={show} onClose={onClose}>
        <div className="popup__header">Редактировать</div>
        <Input name="url" value={url} onChange={onChange} placeholder="URL" className="popup" focus={show} />
        <Input name="title" value={title} onChange={onChange} placeholder="Title" className="popup" />
        <button onClick={onEdit}>edit</button>
      </Popup>
    );
  }
}

EditPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  bookmark: PropTypes.shape().isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    show: state.Popup.isEditPopupVisible,
    bookmark: state.Bookmarks.currentBookmark,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEdit: (id, url, title) => dispatch(updateBookmark(id, url, title)),
    onClose: () => {
      dispatch(hideEditPopup());
      dispatch(cleanBookmark());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPopup);
