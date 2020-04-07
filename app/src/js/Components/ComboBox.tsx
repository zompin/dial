import * as React from 'react';
import cs from 'classnames';
import Input from './Input';

interface IProps {
  name: string
  onSelect: (item: IBookmark) => void
  items: Array<IBookmark>
  placeholder?: string
  className?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onShow?: () => void
  onHide?: () => void
}

const ComboBox = ({
  name,
  onSelect,
  items,
  placeholder,
  className,
  onChange,
  onShow,
  onHide,
}: IProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const onShowHandler = () => {
    if (onShow) {
      onShow();
    }

    setIsOpen(true);
  };

  const onHideHandler = () => {
    if (onHide) {
      onHide();
    }

    setIsOpen(false);
  };

  const onEsc = ({ keyCode }: KeyboardEvent) => {
    if (keyCode === 27) {
      onHideHandler();
    }
  };

  const onOutsideClick = ({ target }: MouseEvent) => {
    if (ref.current && !ref.current.contains(target as Node)) {
      onHideHandler();
    }
  };

  const onFocus = React.useCallback(() => {
    if (items.length) {
      onShowHandler();
    }
  }, [items]);

  const onSelectHandler = (b: IBookmark) => {
    onHideHandler();
    onSelect(b);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    onShowHandler();
  };

  React.useEffect(() => {
    if (items.length) {
      onShowHandler();
    } else {
      onHideHandler();
    }
  }, [items]);

  React.useEffect(() => {
    document.addEventListener('click', onOutsideClick);
    document.addEventListener('keydown', onEsc);

    return () => {
      document.removeEventListener('click', onOutsideClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <div className={`combobox combobox_${className}`} ref={ref}>
      <Input
        name={name}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onFocus={onFocus}
      />
      <div
        className={cs('combobox__list', { combobox__list_open: isOpen })}
      >
        {
          items.map((i) => (
            <div className="combobox-item" key={i.id} onClick={() => onSelectHandler(i)}>
              <div className="combobox-item__url">{i.url}</div>
              <div className="combobox-item__title">{i.title}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ComboBox;
