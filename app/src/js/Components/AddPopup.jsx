import { Form } from 'react-final-form';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popup from './Popup';
import Input from './Input';
import ComboBox from './ComboBox';
import Button from './ButtonDefault';
import { addBookmark, setBookmarkParentId } from '../Actions/Bookmarks';
import { getLocaleMessage } from '../utils';
import { TYPES } from '../constants';

const AddPopup = () => {
  const dispatch = useDispatch();
  const parentId = useSelector((state) => state.Bookmarks.bookmarkParentId);
  const [history, setHistory] = useState([]);
  const [isSelect, setSelect] = useState(false);

  const onInputChange = ({ target }) => {
    setSelect(true);

    browser.history.search({
      text: target.value,
      maxResults: 10,
    })
      .then((data) => setHistory(data));
  };

  const onSubmit = ({ url, title }, form) => {
    browser.bookmarks.create({
      type: TYPES.BOOKMARK,
      parentId,
      title,
      url,
    })
      .then((b) => {
        dispatch(addBookmark(b));
        dispatch(setBookmarkParentId(''));
        form.change('url', '');
        form.change('title', '');
      });
  };

  const onClose = () => {
    dispatch(setBookmarkParentId(''));
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

  return (
    <Popup isOpen={!!parentId} onClose={onClose}>
      <div className="popup__header">{getLocaleMessage('addBookmark')}</div>
      <Form onSubmit={onSubmit} initialValues={{ url: '', title: '' }} validate={validate}>
        {({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <ComboBox
              name="url"
              placeholder={getLocaleMessage('url')}
              items={isSelect ? history : []}
              onInputChange={onInputChange}
              className="popup"
              onComboItemSelect={(id) => {
                const item = history.find((i) => i.id === id);

                if (item) {
                  form.change('url', item.url);
                  form.change('title', item.title);
                  setSelect(false);
                }
              }}
            />
            <Input
              name="title"
              placeholder={getLocaleMessage('title')}
              className="popup"
            />
            <Button type="submit" primary>{getLocaleMessage('add')}</Button>
          </form>
        )}
      </Form>
    </Popup>
  );
};

export default AddPopup;
