import { Form } from 'react-final-form';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';
import { FormApi } from 'final-form';
import Popup from './Popup';
import Input from './Input';
import ComboBox from './ComboBox';
import Button from './ButtonDefault';
import { bookmarkAdd, bookmarkSetParentId } from '../Actions/bookmarks';
import { getLocaleMessage } from '../utils';
import { IStore } from '../Reducers';

interface IForm {
  title: string
  url: string
}

const AddPopup = () => {
  const dispatch = useDispatch();
  const parentId = useSelector((state: IStore) => state.bookmarks.bookmarkParentId);
  const [history, setHistory] = React.useState([]);
  const isOpenRef = React.useRef(false);
  const titleRef = React.useRef<HTMLInputElement>(null);

  const onSearch = (text: string) => {
    browser.history.search({
      text: text,
      maxResults: 10,
    })
      .then((data) => setHistory(data));
  };

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(target.value);
  };

  const onSubmit = ({ url, title }: IForm, form: FormApi<IForm>) => {
    browser.bookmarks.create({
      parentId,
      title,
      url,
    })
      .then((b) => {
        dispatch(bookmarkAdd(b as IBookmark));
        dispatch(bookmarkSetParentId(''));
        form.change('url', '');
        form.change('title', '');
      });
  };

  const onClose = () => {
    if (!isOpenRef.current) {
      dispatch(bookmarkSetParentId(''));
    }
  };

  const onSelect = (form: FormApi<IForm>, b: IBookmark) => {
    form.change('url', b.url);
    form.change('title', b.title);

    if (titleRef.current) {
      setTimeout(() => {
        titleRef.current.focus();
      }, 100);
    }
  };

  const validate = (values: IForm) => {
    const errors: {
      url?: string
      title?: string
    } = {};

    if (!values.url) {
      errors.url = getLocaleMessage('requiredField');
    }

    if (!values.title) {
      errors.title = getLocaleMessage('requiredField');
    }

    return errors;
  };

  return (
    <Popup isOpen={!!parentId} onClose={onClose}>
      <div className="popup__header">{getLocaleMessage('addBookmark')}</div>
      <Form onSubmit={onSubmit} initialValues={{ url: '', title: '' }} validate={validate}>
        {({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <ComboBox
              name="url"
              placeholder={getLocaleMessage('url')}
              items={history}
              onChange={onInputChange}
              onHide={() => isOpenRef.current = false}
              onShow={() => isOpenRef.current = true}
              className="popup"
              focus={!!parentId}
              onSelect={(b) => onSelect(form, b)}
            />
            <Input
              name="title"
              placeholder={getLocaleMessage('title')}
              className="input_popup"
              ref={titleRef}
            />
            <Button type="submit" primary>{getLocaleMessage('add')}</Button>
          </form>
        )}
      </Form>
    </Popup>
  );
};

export default AddPopup;
