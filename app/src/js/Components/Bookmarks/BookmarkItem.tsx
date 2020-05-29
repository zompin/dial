import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import XButton from '../XButton';
import EditButton from '../EditButton';
import { bookmarkSetEditId, bookmarkSetDeleteId } from '../../Actions/bookmarks';
import { getHostFromUrl } from '../../utils';

interface IProps {
  id: string
  url: string
  title: string
  color: string
  index: number
  onSelect: (source: string, target: string) => void
  onPreSelect: (source: string, target: string) => void
  favicon?: IFavicon
}

const BookmarkItem = ({
  id,
  url,
  title,
  color,
  index,
  onSelect,
  onPreSelect,
  favicon,
}: IProps) => {
  const dispatch = useDispatch();
  const [isDraggable, setIsDraggable] = React.useState(false);
  const filteredUrl = getHostFromUrl(url);

  const onEdit = (bookmarkId: string) => {
    dispatch(bookmarkSetEditId(bookmarkId));
  };

  const onDelete = (bookmarkId: string) => {
    dispatch(bookmarkSetDeleteId(bookmarkId));
  };

  const onDragStart = (e: React.DragEvent) => {
    setIsDraggable(true);
    e.dataTransfer.setData('text', id);
  };

  const onDragEnd = () => {
    setIsDraggable(false);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const source = e.dataTransfer.getData('text');
    onPreSelect(source, id);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const source = e.dataTransfer.getData('text');
    onSelect(source, id);
  };

  if (favicon) {
    let { image } = favicon;
    if (image.indexOf('data:image/png;base64,') === 0) {
      // console.log(atob(image.substr('data:image/png;base64,'.length)))
      const tmp = image.substr('data:image/png;base64,'.length);
      const tmp2 = atob(tmp);
      const buff = new ArrayBuffer(tmp2.length);
      const arr = new Uint8Array(buff);

      // console.log(image)

      arr.forEach((_, index) => {
        arr[index] = tmp2.charCodeAt(index);
        // console.log(index)

        if (index > 0 && index < 4) {
        }
      });

      // console.log(image.substr('data:image/png;base64,'.length))
      // console.log(tmp2)

      // console.log(tmp2.charCodeAt(1), tmp2.charCodeAt(2), tmp2.charCodeAt(3))
      // for (let i = 0; i < tmp.length; i++) {
      //   console.log(tmp.charCodeAt(i))
      // }

    }
    // console.log(btoa(favicon.image))
  }

  return (
    <div
      className={`bookmark bookmark_${color}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{
        animationDelay: `${index * 0.007}s`,
      }}
    >
      <a
        className="bookmark__link"
        href={url}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        draggable
        style={{
          opacity: isDraggable ? 0 : undefined,
        }}
      >
        <div className="bookmark__title">
          {
            favicon && favicon.image && (
              <img className="bookmark__favicon" src={favicon.image} alt={title} />
            )
          }
          {title}
        </div>
        <div className="bookmark__url">
          <div className="bookmark__url-inner">
            {filteredUrl}
          </div>
        </div>
      </a>
      <XButton
        onClick={() => onDelete(id)}
        className="bookmark"
      />
      <EditButton
        onClick={() => onEdit(id)}
        className="bookmark"
      />
      {
        index < 10 && (
          <div
            className="bookmark__code"
          >
            {`CTRL + ${(index + 1) % 10}`}
          </div>
        )
      }
    </div>
  );
};

export default BookmarkItem;
