import * as React from 'react';
import cs from 'classnames';
import { useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';
import XButton from '../XButton/XButton';
import EditButton from '../EditButton/EditButton';
import ButtonDefault from '../ButtonDefault/ButtonDefault';
import { profileRemove, profileUpdate } from '../../Actions/profiles';
import { getLocaleMessage } from '../../utils';
import * as style from './Profile.module.scss'

interface IProps {
  data: IProfile
}

const Profile = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const [title, setTitle] = React.useState(data.title);
  const [isEdit, setEdit] = React.useState(false);
  const [isDelete, setDelete] = React.useState(false);

  const onSave = () => {
    browser.bookmarks.update(data.id, { title })
      .then((e) => {
        dispatch(profileUpdate({ id: data.id, title }));
        setEdit(false);
      });
  };

  const onDelete = () => {
    browser.bookmarks.remove(data.id)
      .then(() => {
        dispatch(profileRemove(data.id));
      });
  };

  React.useEffect(() => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    input.focus();
  }, [isEdit]);

  return (
    <>
      <div className={cs(style.profile, { [style.profile_expand]: isDelete || isEdit })}>
        {
          isEdit ? (
            <input
              className={style.profile__input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={data.title}
              ref={inputRef}
            />
          ) : (
            <div className={style.profile__name}>
              {data.title}
            </div>
          )
        }
        <div className={cs(style.profile__control, { [style.profile__control_hide]: isEdit || isDelete })}>
          <EditButton onClick={() => setEdit(true)} />
          <XButton onClick={() => setDelete(true)} />
        </div>
      </div>
      <div className={cs(style.profile__dialog, { [style.profile__dialog_show]: isDelete })}>
        <ButtonDefault className={style.button} onClick={onDelete}>
          {getLocaleMessage('delete')}
        </ButtonDefault>
        <ButtonDefault className={style.button} onClick={() => setDelete(false)}>
          {getLocaleMessage('cancel')}
        </ButtonDefault>
      </div>
      <div className={cs(style.profile__dialog, { [style.profile__dialog_show]: isEdit })}>
        <ButtonDefault className={style.button} onClick={onSave}>
          {getLocaleMessage('save')}
        </ButtonDefault>
        <ButtonDefault className={style.button} onClick={() => setEdit(false)}>
          {getLocaleMessage('cancel')}
        </ButtonDefault>
      </div>
    </>
  );
};

export default Profile;
