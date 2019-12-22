import React from 'react';
import { useSelector } from 'react-redux';
import cs from 'classnames';

const Preloader = () => {
  const isLoaded = useSelector((state) => state.Bookmarks.isLoaded);
  return (
    <div className={cs('preloader', { preloader_show: !isLoaded })}>
      <div className="preloader__b preloader__b_1" />
      <div className="preloader__b preloader__b_2" />
    </div>
  );
};

export default Preloader;
