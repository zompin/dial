import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-final-form';
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

  const onSubmit = (values) => {
    browser.bookmarks.update(bookmarkEditId, { url: values.url, title: values.title })
      .then(() => {
        dispatch(updateBookmark(bookmarkEditId, title, url));
        dispatch(setBookmarkEditId(''));
      });
  };

  const onClose = () => {
    dispatch(setBookmarkEditId(''));
  };

  const validate = (values) => {
    const errors = {};

    if (!values.url) {
      errors.url = getLocaleMessage('requiredField');
    }

    if (!values.title) {
      errors.title = getLocaleMessage('requiredField');
    }

    return errors;
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
      <Form onSubmit={onSubmit} initialValues={{ url, title }} validate={validate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input
              name="url"
              placeholder={getLocaleMessage('url')}
              className="popup"
            />
            <Input
              name="title"
              placeholder={getLocaleMessage('title')}
              className="popup"
            />
            <Button type="submit" primary>
              {getLocaleMessage('save')}
            </Button>
          </form>
        )}
      </Form>
    </Popup>
  );
};

export default EditPopup;
