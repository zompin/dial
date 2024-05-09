import * as React from 'react';
import { useSelector } from 'react-redux';
import cs from 'classnames';
import { IStore } from '../../Reducers';
import * as style from './Preloader.module.scss'

const Preloader = () => {
  const isLoaded = useSelector((state: IStore) => state.bookmarks.isLoaded);
  return (
    <div className={cs(style.preloader, { [style.preloader_show]: !isLoaded })}>
      <div className={cs(style.b, style.b_1)} />
      <div className={cs(style.b, style.b_2)} />
    </div>
  );
};

export default Preloader;
