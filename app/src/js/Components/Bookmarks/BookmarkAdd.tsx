import * as React from 'react';
import { useDispatch } from 'react-redux';
import { bookmarkSetParentId } from '../../Actions/bookmarks';

interface IProps {
  index: number
  profile: string
}

const BookmarkAdd = ({ index, profile }: IProps) => {
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch(bookmarkSetParentId(profile));
  };

  return (
    <button
      className="bookmark-add"
      onClick={onAdd}
      style={{
        animationDelay: `${index * 0.007}s`,
      }}
    >
      <div className="bookmark-add__l bookmark-add__l_1" />
      <div className="bookmark-add__l bookmark-add__l_2" />
    </button>
  );
};

export default BookmarkAdd;
