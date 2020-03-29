import * as React from 'react';
import cs from 'classnames';

interface IProps {
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactElement | React.ReactText
  primary?: boolean
  type?: 'button' | 'submit'
}

const ButtonDefault = ({
  className,
  onClick,
  children,
  primary,
  type,
}: IProps) => (
  <button
    type={type}
    onClick={onClick}
    className={cs(`button-default ${className}`, {
      'button-default_primary': primary,
    })}
  >
    {children}
  </button>
);

export default ButtonDefault;
