import * as React from 'react';
import cs from 'classnames';
import { useField } from 'react-final-form';
import * as style from './Input.module.scss'

interface IProps {
  name: string
  placeholder?: string
  className?: string
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: (e: React.MouseEvent) => void
  focus?: boolean
}

const Input = React.forwardRef(({
  name,
  placeholder,
  className,
  onFocus,
  onBlur,
  onChange,
  onClick,
  focus,
}: IProps, inputRef: React.Ref<HTMLInputElement>) => {
  const { input, meta } = useField(name);
  const ref = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    if (!focus || !ref.current) {
      return;
    }

    const input = ref.current.querySelector('input');

    if (input) {
      setTimeout(() => {
        input.focus();
      }, 100);
    }
  }, [focus]);

  return (
    <div className={cs(style.input, className)} ref={ref}>
      <div className={cs(style.placeholder, { [style.placeholder_empty]: !input.value })}>
        {placeholder}
      </div>
      <input
        className={style.value}
        ref={inputRef}
        name={name}
        value={input.value}
        onFocus={onInputFocus}
        onChange={onInputChange}
        onBlur={onInputBlur}
        onClick={onClick}
      />
      <div className={cs(style.error, { [style.error_show]: meta.touched && meta.error })}>{meta.error}</div>
    </div>
  );
});

export default Input;
