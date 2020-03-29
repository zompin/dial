import * as React from 'react';

interface IProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const EditButton = ({ onClick, className }: IProps) => (
  <button onClick={onClick} className={`edit-button edit-button_${className}`}>
    <div className="edit-button__l edit-button__l_1" />
    <div className="edit-button__l edit-button__l_2" />
    <div className="edit-button__l edit-button__l_3" />
  </button>
);

export default EditButton;
