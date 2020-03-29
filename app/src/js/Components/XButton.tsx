import * as React from 'react';

interface IProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  className?: string,
  action?: string,
}

const XButton = ({ onClick, className, action }: IProps) => (
  <button className={`x-button x-button_${className || ''}`} onClick={onClick} data-action={action} type="button">
    <div className='x-button__l x-button__l_1' />
    <div className="x-button__l x-button__l_2" />
  </button>
);

export default XButton;
