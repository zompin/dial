import * as React from 'react';

interface IProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const PlusButton = ({ onClick, className }: IProps) => (
  <button className={`plus-button plus-button_${className}`} onClick={onClick}>
    <div className="plus-button__l plus-button__l_1" />
    <div className="plus-button__l plus-button__l_2" />
  </button>
);

export default PlusButton;
