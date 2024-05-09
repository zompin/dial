import * as React from 'react';
import { useDispatch } from 'react-redux';
import { bookmarkSetParentId } from '../../Actions/bookmarks';
import cn from 'classnames'
import * as style from './Bookmarks.module.scss'

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
      className={style.bookmarkAdd}
      onClick={onAdd}
      style={{
        animationDelay: `${index * 0.007}s`,
      }}
    >
      <div className={cn(style.bookmarkAdd__l, style.bookmarkAdd__l_1)} />
      <div className={cn(style.bookmarkAdd__l, style.bookmarkAdd__l_2)} />
    </button>
  );
};

export default BookmarkAdd;
