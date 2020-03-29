import * as React from 'react';

interface IProps {
  checked: boolean
  onChange: (name: string, value: boolean) => void
  name: string
  className?: string
}

const SlideCheckbox = ({
  checked,
  onChange,
  name,
  className,
}: IProps) => (
  <div className={`slide-checkbox slide-checkbox_${className}`}>
    <input className="slide-checkbox__input" type="checkbox" checked={checked} onChange={() => onChange(name, !checked)} />
    <div className="slide-checkbox__slider" />
  </div>
);

export default SlideCheckbox;
