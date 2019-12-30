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
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [history, setHistory] = useState([]);
  const [isSelect, setSelect] = useState(false);

  const onInputChange = (_, v) => {
    setUrl(v);
    setSelect(true);

    browser.history.search({
      text: v,
      maxResults: 10,
    })
      .then((data) => setHistory(data));
  };

  const onComboSelect = (id) => {
    const item = history.find((i) => i.id === id);

    if (item) {
      setUrl(item.url);
      setTitle(item.title);
      setSelect(false);
    }
  };

  const onAdd = () => {
    browser.bookmarks.create({
      type: TYPES.BOOKMARK,
      parentId,
      title,
      url,
    })
      .then((b) => {
        dispatch(addBookmark(b));
        dispatch(setBookmarkParentId(''));
      });
  };

  const onClose = () => {
    dispatch(setBookmarkParentId(''));
  };

  return (
    <Popup isOpen={!!parentId} onClose={onClose}>
      <div className="popup__header">{getLocaleMessage('addBookmark')}</div>
      <ComboBox
        name="url"
        value={url}
        placeholder={getLocaleMessage('url')}
        onInputChange={onInputChange}
        items={isSelect ? history : []}
        onComboItemSelect={onComboSelect}
        className="popup"
      />
      <Input
        name="title"
        value={title}
        onChange={(_, v) => setTitle(v)}
        placeholder={getLocaleMessage('title')}
        className="popup"
      />
      <Button onClick={onAdd} primary>{getLocaleMessage('add')}</Button>
    </Popup>
  );
};

export default AddPopup;
