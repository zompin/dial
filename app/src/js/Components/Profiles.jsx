import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cs from 'classnames';
import EditButton from './EditButton';
import ProfilesPopup from './ProfilesPopup';
import { setProfile } from '../Actions/Profiles';

const Profiles = () => {
  const [isPopup, setPopup] = useState(false);
  const dataRef = useRef([]);
  const currentRef = useRef('');
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Profiles.data);
  const isLoaded = useSelector((state) => state.Profiles.isLoaded);
  const currentProfile = useSelector((state) => state.Profiles.current);
  dataRef.current = data;
  currentRef.current = currentProfile;

  const onSelect = (id) => {
    dispatch(setProfile(id));
  };

  const onCommand = (command) => {
    const index = dataRef.current.findIndex((p) => p.id === currentRef.current);

    if (index === -1) {
      return;
    }

    if (command === 'profile-next' && index < dataRef.current.length - 1) {
      onSelect(dataRef.current[index + 1].id);
    }

    if (command === 'profile-prev' && index > 0) {
      onSelect(dataRef.current[index - 1].id);
    }
  };

  useEffect(() => {
    browser.commands.onCommand.addListener(onCommand);

    return () => {
      browser.commands.onCommand.removeListener(onCommand);
    };
  }, []);

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
