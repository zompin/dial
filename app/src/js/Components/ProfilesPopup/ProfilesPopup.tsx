import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-final-form';
import { browser } from 'webextension-polyfill-ts';
import { FormApi } from 'final-form';
import Popup from '../Popup/Popup';
import ButtonDefault from '../ButtonDefault/ButtonDefault';
import Input from '../Input/Input';
import Profile from '../Profile/Profile';
import { profileAdd } from '../../Actions/profiles';
import { getAppFolder, getLocaleMessage } from '../../utils';
import { IStore } from '../../Reducers';
import * as style from './ProfilesPopup.module.scss'

interface IProps {
  isOpen: boolean
  onClose: () => void
}

interface IForm {
  title: string
}

const ProfilesPopup = ({ isOpen, onClose }: IProps) => {
  const dispatch = useDispatch();
  const data = useSelector((state: IStore) => state.profiles.data);

  const onSubmit = async ({ title }: IForm, form: FormApi<IForm>) => {
    const { id } = await getAppFolder();

    browser.bookmarks.create({
      parentId: id,
      title,
    })
      .then((p) => {
        dispatch(profileAdd(p));
        form.change('title', '');
        form.resetFieldState('title');
      });
  };

  const validate = (values: IForm) => {
    const errors: {
      title?: string
    } = {};

    if (!values.title) {
      errors.title = getLocaleMessage('requiredField');
    }

    return errors;
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className={style.profilesPopup__title}>{getLocaleMessage('profiles')}</div>
      <div className={style.profilesPopup__items}>
        {
          data.map((d) => (
            <Profile key={d.id} data={d} />
          ))
        }
      </div>
      <Form onSubmit={onSubmit} initialValues={{ title: '' }} validate={validate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={style.profilesPopup__add}>
              <Input name="title" placeholder={getLocaleMessage('title')} />
              <ButtonDefault type="submit">+</ButtonDefault>
            </div>
          </form>
        )}
      </Form>
    </Popup>
  );
};

export default ProfilesPopup;
