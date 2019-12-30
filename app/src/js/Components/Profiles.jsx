import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cs from 'classnames';
import EditButton from './EditButton';
import ProfilesPopup from './ProfilesPopup';
import { setProfile } from '../Actions/Profiles';

const Profiles = () => {
  const [isPopup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Profiles.data);
  const isLoaded = useSelector((state) => state.Profiles.isLoaded);
  const currentProfile = useSelector((state) => state.Profiles.current);

  const onSelect = (id) => {
    dispatch(setProfile(id));
  };

  return (
    <div className="profiles">
      <div className="profiles__inner">
        <div className="profiles__items">
          {
            data.map((p) => (
              <button
                onClick={() => onSelect(p.id)}
                key={p.id}
                type="button"
                className={cs('profiles__item', {
                  profiles__item_active: currentProfile === p.id,
                })}
              >
                {p.title}
              </button>
            ))
          }
        </div>
        {
          isLoaded && (
            <EditButton className="profiles" onClick={() => setPopup(true)} />
          )
        }
      </div>
      <ProfilesPopup onClose={() => setPopup(false)} isOpen={isPopup} />
    </div>
  );
};

export default Profiles;
