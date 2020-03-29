import { Form } from 'react-final-form';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';
import { FormApi } from 'final-form';
import Popup from './Popup';
import Input from './Input';
// @ts-ignore
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
  const [isSelect, setSelect] = React.useState(false);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSelect(true);

    browser.history.search({
      text: target.value,
      maxResults: 10,
    })
      .then((data) => setHistory(data));
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
    dispatch(bookmarkSetParentId(''));
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
              items={isSelect ? history : []}
              onInputChange={onInputChange}
              className="popup"
              onComboItemSelect={(id: string) => {
                const item = history.find((i) => i.id === id);

                if (item) {
                  form.change('url', item.url);
                  form.change('title', item.title);
                  setSelect(false);
                }
              }}
            />
            <Input
              name="title"
              placeholder={getLocaleMessage('title')}
              className="popup"
            />
            <Button type="submit" primary>{getLocaleMessage('add')}</Button>
          </form>
        )}
      </Form>
    </Popup>
  );
};

export default AddPopup;
