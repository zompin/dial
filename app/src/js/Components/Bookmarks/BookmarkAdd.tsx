import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bookmarkSetParentId } from '../../Actions/bookmarks';
import { IStore } from '../../Reducers';

const BookmarkAdd = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state: IStore) => state.profiles.current);

  const onAdd = () => {
    dispatch(bookmarkSetParentId(currentProfile));
  };

  return (
    <button className="bookmark-add" onClick={onAdd}>
      <div className="bookmark-add__l bookmark-add__l_1" />
      <div className="bookmark-add__l bookmark-add__l_2" />
    </button>
  );
};

export default BookmarkAdd;
