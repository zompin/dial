import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import XButton from '../XButton';
import EditButton from '../EditButton';
import { showPopupAction } from '../../Actions/Popup';

const BookmarkItem = ({
  id,
  url,
  title,
  onDelete,
  onEdit,
  color,
  index,
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
      <XButton
        onClick={() => onDelete(id)}
        className="bookmark"
      />
      <EditButton onClick={() => onEdit(id)} className="bookmark" />
      {
        index < 10 && (
          <div
            className="bookmark__code"
          >
            {`CTRL + ${(index + 1) % 10}`}
          </div>
        )
      }
    </div>
  );
};

BookmarkItem.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onEdit: (id) => {
      dispatch(showPopupAction('edit', { id }));
    },
  };
}

export default connect(null, mapDispatchToProps)(BookmarkItem);
