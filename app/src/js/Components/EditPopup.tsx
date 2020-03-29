import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-final-form';
import { browser } from 'webextension-polyfill-ts';
import Popup from './Popup';
import Input from './Input';
import Button from './ButtonDefault';
import { bookmarkSetEditId, bookmarkUpdate } from '../Actions/bookmarks';
import { getLocaleMessage } from '../utils';
import { IStore } from '../Reducers';

interface IForm {
  title: string
  url: string
}

const EditPopup = () => {
  const dispatch = useDispatch();
  const bookmarkEditId = useSelector((state: IStore) => state.bookmarks.bookmarkEditId);
  const bookmarks = useSelector((state: IStore) => state.bookmarks.data);
  const [url, setUrl] = React.useState('');
  const [title, setTitle] = React.useState('');

  const onSubmit = (values: IForm) => {
    browser.bookmarks.update(bookmarkEditId, { url: values.url, title: values.title })
      .then(() => {
        dispatch(bookmarkUpdate({ id: bookmarkEditId, title: values.title, url: values.url }));
        dispatch(bookmarkSetEditId(''));
      });
  };

  const onClose = () => {
    dispatch(bookmarkSetEditId(''));
  };

  const validate = (values: IForm) => {
    const errors: {
      url?: string
      title?: string
    } = {};

    if (!values.url) {
      errors.url = getLocaleMessage('requiredField');
    }

    if (!values.title) {
      errors.title = getLocaleMessage('requiredField');
    }

    return errors;
  };

  React.useEffect(() => {
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
