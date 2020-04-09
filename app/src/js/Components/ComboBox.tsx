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
  focus?: boolean
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
  focus,
}: IProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [activeItem, setActiveItem] = React.useState<IBookmark | undefined>();
  const ref = React.useRef<HTMLDivElement>(null);
  const itemsRef = React.useRef<IBookmark[]>([]);
  const activeItemRef = React.useRef<IBookmark | undefined>();

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

  const onArrow = (key: string) => {
    if (itemsRef.current.length === 0) {
      return;
    }

    if (key !== 'ArrowDown' && key !== 'ArrowUp') {
      return;
    }

    let index = itemsRef.current.findIndex(i => activeItemRef.current && i.id === activeItemRef.current.id);

    if (key === 'ArrowDown') {
      index += 1;

      if (index === itemsRef.current.length) {
        index = 0;
      }
    }

    if (key === 'ArrowUp') {
      index -= 1;

      if (index < 0) {
        index = itemsRef.current.length - 1;
      }
    }

    setActiveItem(itemsRef.current[index]);

    if (!ref.current) {
      return;
    }

    const itemsElements = ref.current.querySelectorAll('.combobox__item');

    if (!itemsElements || !itemsElements[index]) {
      return;
    }

    if (index === 0 || index === itemsElements.length - 1) {
      setTimeout(() => {
        // @ts-ignore
        itemsElements[index].focus();
      }, 100);
    } else {
      // @ts-ignore
      itemsElements[index].focus();
    }
  };

  const onKey = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      onHideHandler();
    }

    onArrow(key);
  };

  const onOutsideClick = ({ target }: MouseEvent) => {
    if (ref.current && !ref.current.contains(target as Node)) {
      onHideHandler();
    }
  };

  const onClick = React.useCallback(() => {
    if (items.length) {
      onShowHandler();
    }
  }, [items]);

  const onSelectHandler = (b: IBookmark) => {
    onHideHandler();
    onSelect(b);
  };

  const onSelectHandlerByKey = ({ key, target }: React.KeyboardEvent, b: IBookmark) => {
    if (key === 'Enter' || key === ' ') {
      onSelectHandler(b);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    onShowHandler();
  };

  React.useEffect(() => {
    itemsRef.current = items;
    activeItemRef.current = activeItem;
  }, [items, activeItem]);

  React.useEffect(() => {
    if (items.length) {
      onShowHandler();
    } else {
      onHideHandler();
    }
  }, [items]);

  React.useEffect(() => {
    document.addEventListener('click', onOutsideClick);
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('click', onOutsideClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className={`combobox combobox_${className}`} ref={ref}>
      <Input
        name={name}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onClick={onClick}
        focus={focus}
      />
      <div className={cs('combobox__list', { combobox__list_open: isOpen })}>
        {
          items.map((i) => (
            <button
              key={i.id}
              type="button"
              onClick={() => onSelectHandler(i)}
              onKeyDown={(e) => onSelectHandlerByKey(e, i)}
              onMouseEnter={() => { setActiveItem(i); activeItemRef.current = i; }}
              disabled={!isOpen}
              className={cs('combobox__item', {
                combobox__item_active: activeItem && activeItem.id === i.id,
              })}
            >
              <div className="combobox__url">{i.url}</div>
              <div className="combobox__title">{i.title}</div>
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default ComboBox;
