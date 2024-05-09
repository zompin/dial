import * as React from 'react';
import cn from 'classnames'
import * as style from './EditButton.module.scss'

interface IProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const EditButton = ({ onClick, className }: IProps) => (
  <button onClick={onClick} className={cn(style.editButton, className)}>
    <div className={cn(style.editButton__l, style.editButton__l_1)} />
    <div className={cn(style.editButton__l, style.editButton__l_2)} />
    <div className={cn(style.editButton__l, style.editButton__l_3)} />
  </button>
);

export default EditButton;
