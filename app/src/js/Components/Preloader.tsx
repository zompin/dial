import * as React from 'react';
import { useSelector } from 'react-redux';
import cs from 'classnames';
import { IStore } from '../Reducers';

const Preloader = () => {
  const isLoaded = useSelector((state: IStore) => state.bookmarks.isLoaded);
  return (
    <div className={cs('preloader', { preloader_show: !isLoaded })}>
      <div className="preloader__b preloader__b_1" />
      <div className="preloader__b preloader__b_2" />
    </div>
  );
};

export default Preloader;
