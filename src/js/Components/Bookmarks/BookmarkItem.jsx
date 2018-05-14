import React from 'react';
import XButton from '../XButton';

const BookmarkItem = ({ url, title, onDelete, onEdit })  => (
    <div className="bookmark">
        <div className="bookmark__inner">
            <div className="bookmark__title">
                {title}
            </div>
            <div className="bookmark__url">{url}</div>
            <a className="bookmark__link" href={url} />
            <XButton onClick={onDelete} className="bookmark" />
            <button className="bookmark__edit" onClick={onEdit}>
                edit
            </button>
        </div>
    </div>
);

export default BookmarkItem;
