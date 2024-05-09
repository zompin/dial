import * as React from 'react';
import cn from 'classnames';
import * as style from './ComboBox.module.scss'
import Input from '../Input/Input';

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
  const isOpenRef = React.useRef(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const itemsRef = React.useRef<IBookmark[]>([]);
  const activeItemRef = React.useRef<IBookmark | undefined>();

  const onShowHandler = () => {
    if (onShow) {
      onShow();
    }

    isOpenRef.current = true;
    setIsOpen(true);
  };

  const onHideHandler = () => {
    if (onHide) {
      onHide();
    }

    isOpenRef.current = false;
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
    if (isOpenRef.current && ref.current && !ref.current.contains(target as Node)) {
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

  const onSelectHandlerByKey = ({ key }: React.KeyboardEvent, b: IBookmark) => {
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
    <div className={cn(style.combobox, className)} ref={ref}>
      <Input
        name={name}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onClick={onClick}
        focus={focus}
        // className={cn({ input_combobox: isOpen })}
      />
      <div className={cn(style.combobox__list, { [style.combobox__list_open]: isOpen })}>
        {
          items.map((i) => (
            <button
              key={i.id}
              type="button"
              onClick={() => onSelectHandler(i)}
              onKeyDown={(e) => onSelectHandlerByKey(e, i)}
              onMouseEnter={() => { setActiveItem(i); activeItemRef.current = i; }}
              disabled={!isOpen}
              className={cn(style.combobox__item, {
                [style.combobox__item_active]: activeItem && activeItem.id === i.id,
              })}
            >
              <div className={style.combobox__url}>{i.url}</div>
              <div className={style.combobox__title}>{i.title}</div>
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default ComboBox;
