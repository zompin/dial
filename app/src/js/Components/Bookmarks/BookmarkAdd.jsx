import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBookmarkParentId } from '../../Actions/Bookmarks';

const BookmarkAdd = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.Profiles.current);

  const onAdd = () => {
    dispatch(setBookmarkParentId(currentProfile));
  };

  return (
    <button className="bookmark-add" onClick={onAdd}>
      <div className="bookmark-add__l bookmark-add__l_1" />
      <div className="bookmark-add__l bookmark-add__l_2" />
    </button>
  );
};

export default BookmarkAdd;
