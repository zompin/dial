import React from 'react';
import BookmarksItem from './BookmarkItem';

const BookmarksList = ({ bookmarks, onDelete, onEdit }) => (
    <div className="bookmarks">
        {
            !!bookmarks.length &&
            bookmarks.map(
                b => (
                    <BookmarksItem
                        key={b.id}
                        url={b.url}
                        title={b.title}
                        onDelete={() => onDelete(b.id)}
                        onEdit={() => onEdit(b.id)}
                    />
                )
            )
        }
        {
            !bookmarks.length &&
            <div>Не закладок</div>
        }
    </div>
);

export default BookmarksList;
