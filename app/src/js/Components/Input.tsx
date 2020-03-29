import * as React from 'react';
import cs from 'classnames';
import { useField } from 'react-final-form';

interface IProps {
  name: string
  placeholder?: string
  className?: string
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = React.forwardRef(({
  name,
  placeholder,
  className,
  onFocus,
  onBlur,
  onChange,
}: IProps, ref: React.Ref<HTMLInputElement>) => {
  const { input, meta } = useField(name);

  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(e);
    }
    input.onFocus(e);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    input.onChange(e);
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
    }
    input.onBlur(e);
  };

  return (
    <div className={`input input_${className}`}>
      <div className={cs('input__placeholder', { input__placeholder_empty: !input.value })}>
        {placeholder}
      </div>
      <input
        className="input__value"
        ref={ref}
        name={name}
        value={input.value}
        onFocus={onInputFocus}
        onChange={onInputChange}
        onBlur={onInputBlur}
      />
      <div className={cs('input__error', { input__error_show: meta.touched && meta.error })}>{meta.error}</div>
    </div>
  );
});

export default Input;
