import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Popup from './Popup';
import ButtonDefault from './ButtonDefault';

const ProfilesPopup = ({ isOpen, onClose }) => {
  const data = useSelector((state) => state.Profiles.data);
  const onAdd = () => {};

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="profiles-popup__items">
        {
          data.map((d) => (
            <div className="profiles-popup__item" key={d.id}>
              {d.title}
            </div>
          ))
        }
      </div>
      <ButtonDefault onClick={onAdd}>+</ButtonDefault>
    </Popup>
  );
};

ProfilesPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfilesPopup;
