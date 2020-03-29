import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {browser} from 'webextension-polyfill-ts';
import Popup from './Popup';
import { getLocaleMessage } from '../utils';
import ButtonDefault from './ButtonDefault';
import { bookmarkRemove, bookmarkSetDeleteId } from '../Actions/bookmarks';
import {IStore} from '../Reducers';

const DeletePopup = () => {
  const dispatch = useDispatch();
  const bookmarkDeleteId = useSelector((state: IStore) => state.bookmarks.bookmarkDeleteId);

  const onDelete = () => {
    browser.bookmarks.remove(bookmarkDeleteId)
      .then(() => {
        dispatch(bookmarkRemove(bookmarkDeleteId));
        dispatch(bookmarkSetDeleteId(''));
      });
  };

  const onCancel = () => {
    dispatch(bookmarkSetDeleteId(''));
  };

  return (
    <Popup isOpen={!!bookmarkDeleteId} onClose={onCancel}>
      <div>
        {getLocaleMessage('removeBookmarkQuestions')}
      </div>
      <ButtonDefault className="button-default_popup" onClick={onDelete} primary>
        {getLocaleMessage('delete')}
      </ButtonDefault>
      <ButtonDefault className="button-default_popup" onClick={onCancel}>
        {getLocaleMessage('cancel')}
      </ButtonDefault>
    </Popup>
  );
};

export default DeletePopup;
