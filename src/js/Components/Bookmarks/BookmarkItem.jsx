import React from 'react';
import PropTypes from 'prop-types';
import XButton from '../XButton';
import EditButton from '../EditButton';

const colors = [
  '#a83252',
  '#3e4a41',
  '#fe7e18',
  '#41516b',
  '#d41137',
  '#53b0bd',
  '#015e7a',
];

const BookmarkItem = ({
  url,
  title,
  onDelete,
  onEdit,
  isEditable,
}) => {
  const urlPosStart = url.indexOf('//');
  const urlPosEnd = url.indexOf('/', urlPosStart + 2);
  const filteredUrl = url.substring(urlPosStart + 2, urlPosEnd);
  const colorIndex = [].reduce.call(filteredUrl, (acc, ch) => ch.charCodeAt(0) + acc, 0) % colors.length;

  return (
    <div className="bookmark" style={{ backgroundColor: colors[colorIndex] }}>
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
          <XButton onClick={onDelete} className="bookmark" />
          <EditButton onClick={onEdit} className="bookmark" />
        </div>
      }
    </div>
  );
};

BookmarkItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
};

export default BookmarkItem;
