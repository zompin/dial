import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import XButton from '../XButton';
import EditButton from '../EditButton';
import { showDialog, showEditPopup } from '../../Actions/Popup';
import { removeBookmark, getBookmark } from '../../Actions/Bookmarks';
import { getLocaleMessage } from '../../utils';

const BookmarkItem = ({
  id,
  url,
  title,
  onDelete,
  removeBookmark,
  onEdit,
  isEditable,
  color,
  index,
  ctrl,
}) => {
  const urlPosStart = url.indexOf('//');
  const urlPosEnd = url.indexOf('/', urlPosStart + 2);
  const filteredUrl = url.substring(urlPosStart + 2, urlPosEnd);

  return (
    <div
      className="bookmark"
      style={{ backgroundColor: color }}
    >
      <a className="bookmark__link" href={url}>
        <div className="bookmark__title">
          {title}
        </div>
        <div className="bookmark__url">
          <div className="bookmark__url-inner">
            {filteredUrl}
          </div>
        </div>
      </a>
      {
        isEditable &&
        <div>
          <XButton
            onClick={
              () => {
                onDelete(() => { removeBookmark(id); }, getLocaleMessage('removeBookmarkQuestions'));
              }
            }
            className="bookmark"
          />
          <EditButton onClick={() => onEdit(id)} className="bookmark" />
        </div>
      }
      {
        index < 10 &&
        <div className={cs('bookmark__code', { bookmark__code_show: ctrl })}>
          CTRL + {(index + 1) % 10}
        </div>
      }
    </div>
  );
};

BookmarkItem.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  removeBookmark: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    removeBookmark: id => dispatch(removeBookmark(id)),
    onDelete: (onAccept, message) => dispatch(showDialog(onAccept, message)),
    onEdit: (id) => {
      dispatch(getBookmark(id));
      dispatch(showEditPopup());
    },
  };
}

export default connect(null, mapDispatchToProps)(BookmarkItem);
