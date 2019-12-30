import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Popup from './Popup';
import ButtonDefault from './ButtonDefault';
import Input from './Input';
import Profile from './Profile';
import { profileAdd } from '../Actions/Profiles';
import { getAppFolder, getLocaleMessage } from '../utils';

const ProfilesPopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const data = useSelector((state) => state.Profiles.data);
  const onAdd = async () => {
    const { id } = await getAppFolder();

    browser.bookmarks.create({
      parentId: id,
      title,
    })
      .then((p) => {
        dispatch(profileAdd(p));
        setTitle('');
      });
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="profiles-popup__title">{getLocaleMessage('profiles')}</div>
      <div className="profiles-popup__items">
        {
          data.map((d) => (
            <Profile key={d.id} data={d} />
          ))
        }
      </div>
      <div className="profiles-popup__add">
        <Input name="title" value={title} onChange={(_, v) => { setTitle(v); }} placeholder={getLocaleMessage('title')} />
        <ButtonDefault onClick={onAdd}>+</ButtonDefault>
      </div>
    </Popup>
  );
};

ProfilesPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfilesPopup;
