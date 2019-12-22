import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from './Popup';
import { getLocaleMessage } from '../utils';
import ButtonDefault from './ButtonDefault';
import {removeBookmark, setBookmarkDeleteId} from '../Actions/Bookmarks';


const DeletePopup = () => {
  const dispatch = useDispatch();
  const bookmarkDeleteId = useSelector((state) => state.Bookmarks.bookmarkDeleteId);

  const onDelete = () => {
    browser.bookmarks.remove(bookmarkDeleteId)
      .then(() => {
        dispatch(removeBookmark(bookmarkDeleteId));
        dispatch(setBookmarkDeleteId(''));
      });
  };

  const onCancel = () => {
    dispatch(setBookmarkDeleteId(''));
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
