import React from 'react';
import cs from 'classnames'
import * as style from './XButton.module.scss'

interface IProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  className?: string,
  action?: string,
}

const XButton = ({ onClick, className, action }: IProps) => (
  <button className={cs(style.button, className)} onClick={onClick} data-action={action} type="button">
    <div className={cs(style.button__l, style.button__l_1)} />
    <div className={cs(style.button__l, style.button__l_2)} />
   </button>
);

export default XButton;
