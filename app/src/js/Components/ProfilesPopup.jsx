import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-final-form';
import Popup from './Popup';
import ButtonDefault from './ButtonDefault';
import Input from './Input';
import Profile from './Profile';
import { profileAdd } from '../Actions/Profiles';
import { getAppFolder, getLocaleMessage } from '../utils';

const ProfilesPopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Profiles.data);

  const onSubmit = async ({ title }, form) => {
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

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = getLocaleMessage('requiredField');
    }

    return errors;
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
      <Form onSubmit={onSubmit} initialValues={{ title: '' }} validate={validate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="profiles-popup__add">
              <Input name="title" placeholder={getLocaleMessage('title')} />
              <ButtonDefault type="submit">+</ButtonDefault>
            </div>
          </form>
        )}
      </Form>
    </Popup>
  );
};

ProfilesPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfilesPopup;
