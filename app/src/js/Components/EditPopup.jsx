import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popup from './Popup';
import Input from './Input';
import Button from './ButtonDefault';
import { setBookmarkEditId, updateBookmark } from '../Actions/Bookmarks';
import { getLocaleMessage } from '../utils';

const EditPopup = () => {
  const dispatch = useDispatch();
  const bookmarkEditId = useSelector((state) => state.Bookmarks.bookmarkEditId);
  const bookmarks = useSelector((state) => state.Bookmarks.data);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const onEdit = () => {
    browser.bookmarks.update(bookmarkEditId, { url, title })
      .then(() => {
        dispatch(updateBookmark(bookmarkEditId, title, url));
        dispatch(setBookmarkEditId(''));
      });
  };
  const onClose = () => {
    dispatch(setBookmarkEditId(''));
  };

  useEffect(() => {
    if (!bookmarkEditId) {
      return;
    }

    const foundBookmark = bookmarks.find((b) => b.id === bookmarkEditId);

    if (!foundBookmark) {
      return;
    }

    setUrl(foundBookmark.url);
    setTitle(foundBookmark.title);
  }, [bookmarkEditId]);

  return (
    <Popup isOpen={!!bookmarkEditId} onClose={onClose}>
      <div className="popup__header">
        {getLocaleMessage('editBookmark')}
      </div>
      <Input
        name="url"
        value={url}
        onChange={(_, value) => setUrl(value)}
        placeholder={getLocaleMessage('url')}
        className="popup"
      />
      <Input
        name="title"
        value={title}
        onChange={(_, value) => setTitle(value)}
        placeholder={getLocaleMessage('title')}
        className="popup"
      />
      <Button onClick={onEdit} primary>
        {getLocaleMessage('save')}
      </Button>
    </Popup>
  );
};

export default EditPopup;
