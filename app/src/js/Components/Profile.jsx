import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { useDispatch } from 'react-redux';
import XButton from './XButton';
import EditButton from './EditButton';
import ButtonDefault from './ButtonDefault';
import { profileRemove, profileUpdate } from '../Actions/Profiles';
import { getLocaleMessage } from "../utils";

const Profile = ({ data }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [title, setTitle] = useState(data.title);
  const [isEdit, setEdit] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const onSave = () => {
    browser.bookmarks.update(data.id, { title })
      .then((e) => {
        dispatch(profileUpdate(data.id, title));
        setEdit(false);
      });
  };

  const onDelete = () => {
    browser.bookmarks.remove(data.id)
      .then(() => {
        dispatch(profileRemove(data.id));
      });
  };

  useEffect(() => {
    const input = inputRef.current;


    if (!input) {
      return;
    }

    input.focus();
  }, [isEdit]);

  return (
    <>
      <div className={cs('profile', { profile_expand: isDelete || isEdit })}>
        {
          isEdit ? (
            <input
              className="profile__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={data.title}
              ref={inputRef}
            />
          ) : (
            <div className="profile__name">
              {data.title}
            </div>
          )
        }
        <div className={cs('profile__control', { profile__control_hide: isEdit || isDelete })}>
          <EditButton onClick={() => setEdit(true)} />
          <XButton onClick={() => setDelete(true)} />
        </div>
      </div>
      <div className={cs('profile__dialog', { profile__dialog_show: isDelete })}>
        <ButtonDefault onClick={onDelete}>
          {getLocaleMessage('delete')}
        </ButtonDefault>
        <ButtonDefault onClick={() => setDelete(false)}>
          {getLocaleMessage('cancel')}
        </ButtonDefault>
      </div>
      <div className={cs('profile__dialog', { profile__dialog_show: isEdit })}>
        <ButtonDefault onClick={onSave}>
          {getLocaleMessage('save')}
        </ButtonDefault>
        <ButtonDefault onClick={() => setEdit(false)}>
          {getLocaleMessage('cancel')}
        </ButtonDefault>
      </div>
    </>
  );
};

Profile.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Profile;
